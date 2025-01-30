// src/controllers/post.js
import minioClient from "../config/minioClient.js";
import Post from "../models/post.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import axios from 'axios';
import { generateServiceToken } from "../middleware/authentication.js";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
});

// Helper function to ensure the bucket exists in MinIO
const ensureBucketExists = async (bucketName) => {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(bucketName, (err, exists) => {
      if (err) {
        return reject(
          new Error("Error checking bucket existence: " + err.message)
        );
      }
      if (!exists) {
        minioClient.makeBucket(bucketName, (err) => {
          if (err) {
            return reject(new Error("Error creating bucket: " + err.message));
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
};

// Helper function to get the appropriate file extension based on the programming language
const getFileExtension = (language) => {
  switch (language) {
    case "C++":
      return "cpp";
    case "Python":
      return "py";
    case "JavaScript":
      return "js";
    case "Java":
      return "java";
    default:
      return "txt";
  }
};

// Helper function to upload to MinIO and get a public URL
const uploadToMinIO = async (bucketName, fileName, content, metaData) => {
  try {
    // Upload the object
    await minioClient.putObject(bucketName, fileName, content, metaData);
    
    // Generate presigned URL using promises
    const presignedUrl = await minioClient.presignedGetObject(
      bucketName,
      fileName,
      7 * 24 * 60 * 60  // 7 days in seconds
    );
    
    return presignedUrl;
  } catch (error) {
    throw new Error(`Error in MinIO operations: ${error.message}`);
  }
};

const getPresignedUrl = async (bucketName, fileName) => {
  try {
    return await minioClient.presignedGetObject(
      bucketName,
      fileName,
      7 * 24 * 60 * 60  // 7 days in seconds
    );
  } catch (error) {
    throw new Error(`Error generating presigned URL: ${error.message}`);
  }
};

// @desc Get all posts with public code snippet URLs for each post
// @route GET /api/posts
// @access Private
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create a new post with either a code snippet or file uploaded to MinIO and send notifications
// @route POST /api/posts
// @access Private
export const createPost = [
  upload.single("file"), // Middleware to handle file upload
  async (req, res) => {
    const { title, content, codeSnippet, language } = req.body;

    if (!title || !content || (!codeSnippet && !req.file)) {
      return res
        .status(400)
        .json({
          message:
            "Title, content, and either a code snippet or file are required",
        });
    }

    try {
      let codeSnippetUrl = null;

      // Ensure the bucket exists
      await ensureBucketExists(process.env.MINIO_BUCKET);
      console.log('Bucket ensured or created successfully.');


      if (req.file) {
        // Handle file upload
        const fileName = uuidv4() + `_${req.file.originalname}`;
        const metaData = { "Content-Type": req.file.mimetype };

        // Upload file to MinIO
        codeSnippetUrl = await uploadToMinIO(
          process.env.MINIO_BUCKET,
          fileName,
          req.file.buffer,
          metaData
        );
      } else if (codeSnippet && language) {
        // Handle code snippet upload
        const fileExtension = getFileExtension(language);
        const fileName = uuidv4() + `.${fileExtension}`;
        const metaData = { "Content-Type": "text/plain" };

        // Convert the codeSnippet to a buffer
        const buffer = Buffer.from(codeSnippet, "utf-8");
        codeSnippetUrl = await uploadToMinIO(
          process.env.MINIO_BUCKET,
          fileName,
          buffer,
          metaData
        );
      }

      // Create the post
      const post = new Post({
        user: req.user._id,
        title,
        content,
        codeSnippet: codeSnippetUrl,
        language: language || null,
      });

      const createdPost = await post.save();
      await createdPost.populate("user", "name");

      // Send notification with retry logic
      const notifyService = async (retries = 3, delay = 1000) => {
        try {
          await axios.post(
            'http://localhost:5002/api/notifications',
            {
              type: 'POST_CREATED',
              post: createdPost,
              userId: req.user._id
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${generateServiceToken()}`
              },
              timeout: 5000
            }
          );
        } catch (error) {
          if (retries > 0 && (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED')) {
            console.log(`Retrying notification... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return notifyService(retries - 1, delay * 2);
          }
          console.error("Notification service error:", error.message);
        }
      };

      // Fire and forget notification
      notifyService().catch(console.error);

      res.status(201).json(createdPost);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
];

// @desc Get a single post by ID
// @route GET /api/posts/:id
// @access Private
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name");
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get code snippet content and refresh presigned URL
// @route GET /api/posts/:id/code
// @access Private
export const getCodeSnippetContent = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || !post.codeSnippet) {
      return res.status(404).json({ message: "Post or code snippet not found" });
    }

    // Extract the filename from the code snippet URL
    const fileName = post.codeSnippet.split("/").pop();

    // Generate a fresh presigned URL if needed
    const freshUrl = await getPresignedUrl(process.env.MINIO_BUCKET, fileName);
    
    // Update the post with the new URL
    post.codeSnippet = freshUrl;
    await post.save();

    // Get the object from MinIO
    const dataStream = await minioClient.getObject(process.env.MINIO_BUCKET, fileName);
    
    let data = '';
    
    dataStream.on('data', chunk => {
      data += chunk;
    });

    dataStream.on('end', () => {
      res.json({ 
        content: data,
        url: freshUrl  // Send the fresh URL back to the client
      });
    });

    dataStream.on('error', error => {
      console.error('Error reading file stream:', error);
      res.status(500).json({ message: "Error reading file stream" });
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Server Error" });
  }
};
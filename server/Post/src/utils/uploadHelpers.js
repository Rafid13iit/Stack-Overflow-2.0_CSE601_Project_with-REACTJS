// post/src/utils/uploadHelpers.js
import { v4 as uuidv4 } from "uuid";
import minioClient from "../config/minioClient.js";

export const ensureBucketExists = async (bucketName) => {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(bucketName, (err, exists) => {
      if (err) {
        return reject(new Error("Error checking bucket existence: " + err.message));
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

export const getFileExtension = (language) => {
  const extensions = {
    "C++": "cpp",
    "Python": "py",
    "JavaScript": "js",
    "Java": "java",
  };
  return extensions[language] || "txt";
};

export const generateFileName = (originalName) => {
  return `${uuidv4()}_${originalName}`;
};

export const uploadToMinIO = async (bucketName, fileName, content, metaData) => {
  try {
    await minioClient.putObject(bucketName, fileName, content, metaData);
    return await minioClient.presignedGetObject(
      bucketName,
      fileName,
      7 * 24 * 60 * 60
    );
  } catch (error) {
    throw new Error(`Error in MinIO operations: ${error.message}`);
  }
};
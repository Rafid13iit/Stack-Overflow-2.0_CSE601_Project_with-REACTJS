import Questions from '../models/Questions.js'
import mongoose from 'mongoose';
import { createNotification } from './Notification.js';

export const AskQuestion = async (req, res) => {
    const PostQuestionData = req.body;
    const postQuestion = new Questions(PostQuestionData);
    try {
        await postQuestion.save();
        
        // Create notifications for all users following relevant tags
        // This is just an example - you'll need to implement user tag following
        const followers = []; // Get users following the question tags
        for (const followerId of followers) {
            await createNotification({
                recipientId: followerId,
                senderId: req.userId,
                type: 'question',
                questionId: postQuestion._id,
                message: `New question asked: ${PostQuestionData.questionTitle}`
            });
        }
        
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
    }
};

export const getAllQuestions = async (req, res) =>{
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteQuestion = async (req, res) =>{
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        await Questions.findByIdAndRemove( _id );    
        res.status(200).json({ message: "successfully deleted..."})
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVote.findIndex((id) => id === String(userId));
        const downIndex = question.downVote.findIndex((id) => id === String(userId));

        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                question.upVote.push(userId);
                
                // Notify question author of upvote
                await createNotification({
                    recipientId: question.userId,
                    senderId: userId,
                    type: 'vote',
                    questionId: question._id,
                    message: `Your question "${question.questionTitle}" received an upvote`
                });
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
        } else if (value === 'downVote') {
            // Similar logic for downvote...
        }

        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({ message: "Voted Successfully" });
    } catch (error) {
        res.status(404).json({ message: "Id not Found" });
    }
};
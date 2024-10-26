import mongoose from 'mongoose';

const NotificationSchema = mongoose.Schema({
    recipientId: { 
        type: String, 
        required: true 
    },
    senderId: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['question', 'answer', 'comment', 'vote'],
        required: true 
    },
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question' 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 2592000 // 30 days TTL index
    }
});

export default mongoose.model("Notification", NotificationSchema);
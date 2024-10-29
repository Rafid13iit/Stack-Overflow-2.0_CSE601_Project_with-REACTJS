import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('/api/notifications', config);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to load notifications.');
            } finally {
                setLoading(false);
            }
        };

        if (userInfo) fetchNotifications();
    }, [userInfo]);

    const handleViewPost = async (notificationId, postId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };
            await axios.delete(`/api/notifications/${notificationId}`, config);
            setNotifications(notifications.filter((notif) => notif._id !== notificationId));
            navigate(`/posts/${postId}`);
        } catch (error) {
            console.error('Error deleting notification:', error);
            setError('Failed to delete notification. Please try again.');
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500 text-center my-4">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-700">Notifications</h1>
            {notifications.length === 0 ? (
                <p className="text-gray-500 text-center">No notifications available.</p>
            ) : (
                <div className="space-y-6">
                    {notifications.map((notification) => (
                        <div key={notification._id} className="p-6 border rounded-lg shadow-md bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow duration-200">
                            <p className="text-xl font-medium text-gray-800 mb-2">{notification.message}</p>
                            <span className="text-sm text-gray-500">
                                {new Date(notification.createdAt).toLocaleString()}
                            </span>
                            <button
                                onClick={() => handleViewPost(notification._id, notification.post)}
                                className="mt-4 inline-flex items-center px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                            >
                                View Post
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationScreen;

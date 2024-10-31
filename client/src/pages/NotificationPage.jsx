import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bell, Loader2, AlertCircle, ChevronRight, Trash2 } from "lucide-react";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      fetchNotifications();
    }
  }, [userInfo, navigate]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get("/api/notifications", config);
      setNotifications(data);
      setError(null);
    } catch (error) {
      setError("Failed to load notifications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPost = async (notificationId, postId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.delete(`/api/notifications/${notificationId}`, config);
      setNotifications(
        notifications.filter((notif) => notif._id !== notificationId)
      );
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await axios.delete(`/api/notifications/${notificationId}`, config);
      setNotifications(
        notifications.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Notifications
              </h1>
            </div>
            {notifications.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {notifications.length} New
              </span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {!loading &&
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-base text-gray-900 font-medium">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {getRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        }
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        handleViewPost(notification._id, notification.post)
                      }
                      className="inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                    >
                      <span>View Post</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {!loading && notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No notifications
            </h3>
            <p className="mt-2 text-gray-500">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationScreen;

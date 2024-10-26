import React, { useState, useEffect } from 'react';
import { Bell, Check, CheckCircle2, Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/get', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/read/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotifications(notifications.map(notif => 
        notif._id === id ? { ...notif, isRead: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification._id);
    if (notification.questionId) {
      navigate(`/questions/${notification.questionId}`);
    }
  };

  const toggleGroup = (date) => {
    setExpandedGroups(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const groupNotifications = (notifications) => {
    const groups = {};
    notifications.forEach(notif => {
      const date = new Date(notif.createdAt).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(notif);
    });
    return groups;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'question':
        return <div className="p-2 bg-blue-100 rounded-full"><Bell className="w-5 h-5 text-blue-600" /></div>;
      case 'vote':
        return <div className="p-2 bg-green-100 rounded-full"><Check className="w-5 h-5 text-green-600" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full"><Bell className="w-5 h-5 text-gray-600" /></div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const groupedNotifications = groupNotifications(notifications);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark all as read
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
        </div>
      ) : (
        Object.entries(groupedNotifications).map(([date, notifs]) => (
          <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleGroup(date)}
            >
              <h2 className="text-lg font-medium text-gray-900">{date}</h2>
              <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedGroups[date] ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedGroups[date] && (
              <div className="divide-y divide-gray-200">
                {notifs.map((notification) => (
                  <div
                    key={notification._id}
                    className={`flex items-start px-6 py-4 cursor-pointer transition-colors ${
                      notification.isRead ? 'bg-white' : 'bg-blue-50'
                    } hover:bg-gray-50`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="ml-4">
                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsPage;
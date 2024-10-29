import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const Hero = () => {

  const [notificationCount, setNotificationCount] = useState(0);

    // Fetch the count of unread notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/api/notifications');
                setNotificationCount(data.length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    // Mark notifications as read when clicking on the notification button
    const handleNotificationsClick = async () => {
        try {
            await axios.post('/api/notifications/mark-as-read');
            setNotificationCount(0); // Reset count once notifications are marked as read
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-600 to-purple-800 py-24 text-white">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-10 md:p-14 shadow-2xl transition-transform hover:-translate-y-2 duration-300">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-200 tracking-wide">
            Welcome to Stack Overflow 2.0
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            A place for developers to connect, learn, and share their knowledge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/posts"
              className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              View Posts
            </a>
            <a
              href="/create-post"
              className="bg-green-500 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              Create a New Post
            </a>
            <button
              onClick={handleNotificationsClick}
              href='/notifications'
              className="relative bg-gray-200 bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold text-blue-100 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
            >
              <FaBell className="mr-2" />
              Notifications
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

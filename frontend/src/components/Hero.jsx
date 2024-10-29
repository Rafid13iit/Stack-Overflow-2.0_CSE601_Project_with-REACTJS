import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

const Hero = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotificationCount(data.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationsClick = async () => {
    try {
      await fetch('/api/notifications/mark-as-read', { method: 'POST' });
      setNotificationCount(0);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-br from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pt-32">
        <div className="flex flex-col items-center text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto pt-20">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Your Gateway to
              <span className="block bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                Developer Knowledge
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a thriving community of developers, share your expertise, and find solutions to your coding challenges.
            </p>
            
            <div className="flex items-center justify-center gap-6">
              <a
                href="/posts"
                className="group px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Browse Questions
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                  →
                </span>
              </a>
              <a
                href="/create-post"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Ask a Question
              </a>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-3 gap-8">
              <div className="p-6 bg-white/50 rounded-xl border border-gray-100 backdrop-blur-sm">
                <div className="text-3xl font-bold text-gray-900 mb-2">15M+</div>
                <div className="text-sm text-gray-600">Questions Asked</div>
              </div>
              <div className="p-6 bg-white/50 rounded-xl border border-gray-100 backdrop-blur-sm">
                <div className="text-3xl font-bold text-gray-900 mb-2">23M+</div>
                <div className="text-sm text-gray-600">Developers</div>
              </div>
              <div className="p-6 bg-white/50 rounded-xl border border-gray-100 backdrop-blur-sm">
                <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
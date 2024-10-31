import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Bell, Search, Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useLogoutMutation } from "../actions/usersApiSlice";
import { logout } from "../actions/authSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications");
        const data = await response.json();
        setNotificationCount(data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationsClick = async () => {
    try {
      await fetch("/api/notifications/mark-as-read", { method: "POST" });
      setNotificationCount(0);
      setShowNotifications(!showNotifications);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/icon.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Stack Overflow 2.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/posts"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Questions
              </Link>

              {/* Notification Bell */}
              <Link
                to="/notifications"
                onClick={handleNotificationsClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-xs flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </Link>

              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-700 font-medium">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{userInfo.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-200"
              />
              <Link
                to="/posts"
                className="text-gray-600 hover:text-gray-900 py-2"
              >
                Questions
              </Link>

              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-gray-900 py-2"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="text-left text-gray-600 hover:text-gray-900 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 py-2"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-600 hover:text-gray-900 py-2"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

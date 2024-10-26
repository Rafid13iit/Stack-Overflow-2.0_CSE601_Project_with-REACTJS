import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Search, X, Menu, ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.svg';
import Avatar from '../../components/Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    dispatch(setCurrentUser(null));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch]);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 group bg-white/10 px-3 py-2 rounded-lg mr-4 backdrop-blur-sm"
            >
              <img 
                className="h-8 w-auto transform transition-transform duration-200 group-hover:scale-105" 
                src={logo} 
                alt="Stack Overflow" 
              />
            </Link>
            <div className="hidden md:flex md:space-x-1">
              {['About', 'Products', 'For Teams'].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group backdrop-blur-sm"
                >
                  <span className="flex items-center">
                    {item}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-75" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form 
              onSubmit={handleSearch}
              className="relative group"
            >
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${isSearchFocused ? 'text-orange-500' : 'text-gray-400'}`}>
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="block w-full pl-10 pr-10 py-2 border-2 border-transparent rounded-xl leading-5 bg-white/10 backdrop-blur-sm text-white placeholder-white/75 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:border-orange-300 sm:text-sm transition-all duration-200"
                placeholder="Search..."
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </form>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {User === null ? (
                <Link
                  to="/Auth"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  Log in
                </Link>
              ) : (
                <>
                  <Link
                    to={`/Users/${User?.result?._id}`}
                    className="inline-flex items-center space-x-2 group px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                  >
                    <Avatar
                      backgroundColor="bg-white"
                      px="px-3"
                      py="py-2"
                      borderRadius="rounded-full"
                      color="text-orange-500"
                      className="transform transition-transform duration-200 group-hover:scale-105 shadow-sm"
                    >
                      {User.result.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="text-sm font-medium text-white group-hover:opacity-75 transition-opacity duration-200">
                      {User.result.name}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-white border-2 border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 active:scale-95 backdrop-blur-sm"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200 backdrop-blur-sm"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-orange-500/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['About', 'Products', 'For Teams'].map((item) => (
              <Link
                key={item}
                to="/"
                className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
            {User === null ? (
              <Link
                to="/Auth"
                className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Log in
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
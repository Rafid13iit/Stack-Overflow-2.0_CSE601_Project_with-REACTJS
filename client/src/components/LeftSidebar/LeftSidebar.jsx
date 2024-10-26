import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Home, Tag, Users, ChevronRight, Building, Star, Bell } from 'lucide-react';

const LeftSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out group relative overflow-hidden ${
      isActive
        ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100'
        : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50/50'
    } ${isActive ? 'shadow-sm' : ''}`;

  const linkItems = [
    { path: '/', icon: Home, label: 'Home', section: 'main' },
    { path: '/Questions', icon: Globe, label: 'Questions', section: 'public' },
    { path: '/Tags', icon: Tag, label: 'Tags', section: 'public' },
    { path: '/Users', icon: Users, label: 'Users', section: 'public' },
    { path: '/Notifications', icon: Bell, label: 'Notifications', section: 'public' }
  ];

  

  return (
    <div className="w-64 h-full bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col h-full py-6">
        {/* Main Navigation */}
        <div className="px-4 mb-8">
          {linkItems
            .filter(item => item.section === 'main')
            .map(({ path, icon: Icon, label }) => (
              <NavLink key={path} to={path} className={navLinkClasses}>
                <div className="flex items-center w-full">
                  <Icon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </NavLink>
            ))}
        </div>

        {/* Public Section */}
        <div className="px-4 mb-3">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center">
            Public
            <div className="ml-2 h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          </h3>
        </div>

        <nav className="space-y-1.5 flex-1 px-4">
          {linkItems
            .filter(item => item.section === 'public')
            .map(({ path, icon: Icon, label }) => (
              <NavLink key={path} to={path} className={navLinkClasses}>
                <div className="flex items-center w-full">
                  <Icon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </NavLink>
            ))}
        </nav>

        {/* Teams Section */}
        <div className="px-4 mt-auto">
          <div className="p-4 rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/80 to-white relative group hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl" />
            
            <div className="relative">
              <div className="flex items-center mb-3">
                <Building className="w-5 h-5 text-orange-500 mr-2" />
                <h4 className="text-sm font-semibold bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
                  Stack Overflow for Teams
                </h4>
              </div>
              
              <p className="text-sm text-orange-600/90">
                Collaborate and share knowledge with your team
              </p>
              
              <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center group/btn active:scale-95">
                <span>Create a Team</span>
                <Star className="w-4 h-4 ml-2 group-hover/btn:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
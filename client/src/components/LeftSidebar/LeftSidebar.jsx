import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Home, Tag, Users } from 'lucide-react';

const LeftSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
      isActive
        ? 'text-orange-700 bg-orange-50 hover:text-orange-800 hover:bg-orange-100'
        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full py-4">
        <div className="px-3 mb-6">
          <NavLink to="/" className={navLinkClasses}>
            <Home className="w-5 h-5 mr-3" />
            Home
          </NavLink>
        </div>

        <div className="px-3 mb-2">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Public
          </h3>
        </div>

        <nav className="space-y-1 flex-1">
          <NavLink to="/Questions" className={navLinkClasses}>
            <Globe className="w-5 h-5 mr-3" />
            Questions
          </NavLink>
          
          <NavLink to="/Tags" className={navLinkClasses}>
            <Tag className="w-5 h-5 mr-3" />
            Tags
          </NavLink>
          
          <NavLink to="/Users" className={navLinkClasses}>
            <Users className="w-5 h-5 mr-3" />
            Users
          </NavLink>
        </nav>

        <div className="px-3 mt-auto">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="text-sm font-medium text-orange-800 mb-2">
              Stack Overflow for Teams
            </h4>
            <p className="text-sm text-orange-700">
              Collaborate and share knowledge with your team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
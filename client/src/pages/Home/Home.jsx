import React, { useState } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { Menu, X } from 'lucide-react';

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1800px] mx-auto relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="flex relative">
          {/* Left Sidebar - Mobile Drawer */}
          <div className={`
            lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-200 ease-in-out shadow-xl
          `}>
            <div className="h-full overflow-y-auto">
              <div className="flex justify-end p-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <LeftSidebar />
            </div>
          </div>

          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block w-64 fixed h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white shadow-sm">
            <LeftSidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 gap-6 p-4 md:p-6 lg:ml-64">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <HomeMainbar />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-20 transition-all duration-200">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Trigger */}
        <button 
          className="lg:hidden fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-200 hover:shadow-xl active:scale-95 z-50"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutAuth = () => {
  const benefits = [
    { text: "Get unstuck — ask a question", emphasis: false },
    { text: "Unlock new privileges like voting and commenting", emphasis: false },
    { text: "Save your favorite tags, filters, and jobs", emphasis: false },
    { text: "Earn reputation and badges", emphasis: false },
    { text: "Collaborate and share knowledge with a private group for FREE.", emphasis: true },
    { text: "Get Stack Overflow for Teams free for up to 50 users.", emphasis: true, isLink: true }
  ];

  return (
    <div className="flex flex-col items-start p-6 bg-white shadow-lg rounded-xl border border-gray-200 max-w-md mx-4 space-y-6 transform hover:scale-[1.02] transition-all duration-200">
      <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        Join the Stack Overflow 2.0 community
      </h1>
      
      <div className="space-y-4 w-full">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 group"
          >
            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              benefit.emphasis ? 'text-orange-500' : 'text-blue-500'
            } group-hover:scale-110 transition-transform duration-200`} />
            
            <p className={`${
              benefit.emphasis 
                ? 'text-gray-700 font-medium' 
                : 'text-gray-600'
            } ${
              benefit.isLink 
                ? 'text-blue-600 hover:text-blue-700 cursor-pointer' 
                : ''
            } text-base leading-relaxed`}>
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
      
      <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full mt-4 opacity-20" />
    </div>
  );
};

export default AboutAuth;
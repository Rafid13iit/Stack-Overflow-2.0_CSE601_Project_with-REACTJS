// UserProfile.jsx
import React, { useState } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Calendar, PenSquare, MapPin, Link as LinkIcon, GitHub, Trophy } from 'lucide-react';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  if (!currentProfile) {
    return (
      <div className='flex min-h-screen bg-orange-50'>
        <LeftSidebar />
        <div className='flex-1 p-8 flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-800'>User not found</h2>
            <p className='text-gray-600 mt-2'>The user you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen bg-orange-50'>
      <LeftSidebar />
      <div className='flex-1 p-6 lg:p-8'>
        <div className='max-w-4xl mx-auto'>
          <section className='bg-white rounded-2xl shadow-md overflow-hidden'>
            {/* Cover Image */}
            <div className='h-48 bg-gradient-to-r from-orange-300 to-orange-500'></div>
          
            {/* Profile Header */}
            <div className='px-8 pb-8'>
              <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16'>
                <div className='flex items-end'>
                  <div className='relative'>
                    <Avatar 
                      backgroundColor="purple" 
                      color="white" 
                      fontSize="50px" 
                      px="40px" 
                      py="30px"
                      className='ring-4 ring-white shadow-xl'
                    >
                      {currentProfile?.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {currentProfile?.badgeStatus && (
                      <span className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full ring-2 ring-white flex items-center justify-center'>
                        <Trophy className='w-4 h-4 text-white' />
                      </span>
                    )}
                  </div>
                  <div className='ml-4'>
                    <h1 className='text-3xl font-bold text-gray-900'>{currentProfile?.name}</h1>
                    <div className='flex items-center gap-4 mt-2 text-gray-600'>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        Joined {moment(currentProfile?.joinedOn).fromNow()}
                      </span>
                      {currentProfile?.location && (
                        <span className='flex items-center gap-1'>
                          <MapPin className='w-4 h-4' />
                          {currentProfile.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {currentUser?.result._id === id && (
                  <button
                    type='button'
                    onClick={() => setSwitch(true)}
                    className='mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    <PenSquare className='w-4 h-4 mr-2' />
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Stats Section */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-4 bg-gray-50 rounded-xl'>
                <div className='text-center p-3'>
                  <div className='text-2xl font-bold text-gray-900'>{currentProfile?.reputation || 0}</div>
                  <div className='text-sm text-gray-600'>Reputation</div>
                </div>
                <div className='text-center p-3'>
                  <div className='text-2xl font-bold text-gray-900'>{currentProfile?.answers?.length || 0}</div>
                  <div className='text-sm text-gray-600'>Answers</div>
                </div>
                <div className='text-center p-3'>
                  <div className='text-2xl font-bold text-gray-900'>{currentProfile?.questions?.length || 0}</div>
                  <div className='text-sm text-gray-600'>Questions</div>
                </div>
                <div className='text-center p-3'>
                  <div className='text-2xl font-bold text-gray-900'>{currentProfile?.reachCount || 0}</div>
                  <div className='text-sm text-gray-600'>Reach</div>
                </div>
              </div>

              {/* Main Content */}
              <div className='mt-8'>
                {Switch ? (
                  <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                ) : (
                  <ProfileBio currentProfile={currentProfile} />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
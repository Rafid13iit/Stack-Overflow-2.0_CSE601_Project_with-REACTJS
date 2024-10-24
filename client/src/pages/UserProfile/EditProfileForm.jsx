// EditProfileForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/users';
import { User, Mail, Tag, FileText, X } from 'lucide-react';

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTags = tags.length === 0 ? currentUser?.result?.tags : tags;
    dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: updatedTags }));
    setSwitch(false);
  };

  return (
    <div className='bg-white rounded-xl'>
      <div className='border-b border-gray-200 pb-4 mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Edit Your Profile</h1>
        <p className='text-gray-600 mt-1'>Update your profile information and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Display name</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <User className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
              placeholder='John Doe'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>About me</label>
          <div className='mt-1'>
            <textarea
              rows='5'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
              placeholder='Tell us about yourself...'
            />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Brief description for your profile.</p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>Watched Tags</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Tag className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              onChange={(e) => setTags(e.target.value.split(' '))}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900'
              placeholder='javascript react nodejs'
            />
          </div>
          <p className='mt-2 text-sm text-gray-500'>Add tags separated by spaces</p>
        </div>

        <div className='flex gap-4 pt-4'>
          <button
            type='submit'
            className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Save Changes
          </button>
          <button
            type='button'
            onClick={() => setSwitch(false)}
            className='inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          >
            <X className='w-4 h-4 mr-2' />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
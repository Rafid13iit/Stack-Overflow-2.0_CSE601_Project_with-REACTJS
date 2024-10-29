import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-primary mb-4 font-weight-bold text-center">Update Profile</h1>

      <Form onSubmit={submitHandler} className="p-4 border rounded shadow-sm bg-light">
        <Form.Group className="mb-4" controlId="name">
          <Form.Label className="font-weight-semibold">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-2 px-3 rounded border-gray-300"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="email">
          <Form.Label className="font-weight-semibold">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-3 rounded border-gray-300"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label className="font-weight-semibold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 px-3 rounded border-gray-300"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label className="font-weight-semibold">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="py-2 px-3 rounded border-gray-300"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100 py-2 font-weight-bold"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="sm" /> : 'Update Profile'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;

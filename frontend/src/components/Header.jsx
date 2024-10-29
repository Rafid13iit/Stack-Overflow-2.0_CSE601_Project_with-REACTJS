// Import necessary modules
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-blue-800 shadow-lg">
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-white text-2xl font-bold tracking-wide">
              Stack Overflow 2.0
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto space-x-4">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={<span className="text-white font-semibold">{userInfo.name}</span>}
                    id="username"
                    menuVariant="dark"
                    className="text-white"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="hover:bg-blue-700 transition duration-200">Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler} className="hover:bg-red-700 transition duration-200">
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="flex items-center text-white hover:text-blue-400 transition duration-200">
                      <FaSignInAlt className="mr-2" /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="flex items-center text-white hover:text-blue-400 transition duration-200">
                      <FaSignOutAlt className="mr-2" /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

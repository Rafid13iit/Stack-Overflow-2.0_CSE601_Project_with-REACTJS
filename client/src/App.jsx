import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AllRoutes />
          </main>
          <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} Stack Overflow 2.0. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default App;
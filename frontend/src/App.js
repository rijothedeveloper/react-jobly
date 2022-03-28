import './App.css';
import { 
  Routes,
  Route, 
} from "react-router-dom";
import Login from './login/Login';
import SignUp from './signup/SignUp'
import Profile from './profile/Profile'
import Companies from './companies/Companies'
import Jobs from './jobs/Jobs'
import Company from './companies/Company'
import Job from './jobs/Job';
import { Outlet, Link } from "react-router-dom";
import JoblyApi from './api';
import { useState } from 'react';
import Logout from './login/Logout';

function App() {

  const [token, setToken] = useState()
  const [currentUser, setCurrentUser] = useState();
  let loggedinUser;
  async function signUp(newUser) {
    try {
      const newToken = await JoblyApi.registerUser(newUser);
      loggedinUser = newUser.username;
      setToken(newToken)
      getUser();
    } catch(error) {

    }
  }

  async function login(user) {
    try {
      const userToken = await JoblyApi.login(user);
      loggedinUser = user.username;
      setToken(userToken)
      getUser();
    } catch(error) {

    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  const getUser = async () => {
    const user = await JoblyApi.getUser(loggedinUser);
    setCurrentUser(user);
  }

  return(
    <Routes>
        <Route path="/" element={<Layout token={token}/>} > |{" "}
            <Route path="login" element={<Login login={login}/>} />
            <Route path="signup" element={<SignUp signUp={signUp} />} />
            <Route path="logout" element={<Logout logout={logout} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:company" element={<Company />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id" element={<Job />} />

        </Route>

        <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
      />

      </Routes>
  )
}

function Layout({token}) {
  return (
    <div className="App">
      <nav>
        <Link to="/" className='leftAlign'>Home</Link>
        { !token && <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>}
        {token && <>
          <Link to="/logout">Logout </Link>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">jobs</Link>
          <Link to="/profile">MyProfile</Link>
        </>}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

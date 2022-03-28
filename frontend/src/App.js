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
import { createContext, useEffect, useState } from 'react';
import Logout from './login/Logout';

const currentUserContext = createContext();

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [currentUser, setCurrentUser] = useState();
  
  let loggedinUser = localStorage.getItem("loggedinUser");
  async function signUp(newUser) {
    try {
      const newToken = await JoblyApi.registerUser(newUser);
      loggedinUser = newUser.username;
      setToken(newToken)
      localStorage.setItem("token", newToken);
      localStorage.setItem("loggedinUser", loggedinUser);
      getUser();
    } catch(error) {

    }
  }

  async function login(user) {
    try {
      const userToken = await JoblyApi.login(user);
      loggedinUser = user.username;
      setToken(userToken)
      localStorage.setItem("token", userToken);
      localStorage.setItem("loggedinUser", loggedinUser);
      getUser();
    } catch(error) {

    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  const getUser = async () => {
    const user = await JoblyApi.getUser(loggedinUser);
    setCurrentUser(user);
  }

  const editUserInfo = async (editedUser) => {
    const user = await JoblyApi.editUser(loggedinUser, editedUser);
    setCurrentUser(user);
  }

  useEffect( () => {
      getUser();
  },[])

  return(
    <currentUserContext.Provider value={currentUser}>
      <Routes>
          <Route path="/" element={<Layout token={token}/>} > |{" "}
              <Route path="login" element={<Login login={login}/>} />
              <Route path="signup" element={<SignUp signUp={signUp} />} />
              <Route path="logout" element={<Logout logout={logout} />} />
              <Route path="profile" element={<Profile user={currentUser} saveUser={editUserInfo}/>} />
              <Route path="companies" element={<Companies />} />
              <Route path="companies/:companyHandle" element={<Company />} />
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
      </currentUserContext.Provider>
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

export {currentUserContext};
export default App;

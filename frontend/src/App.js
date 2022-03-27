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

function App() {
  return(
    <Routes>
        <Route path="/" element={<Layout />} > |{" "}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
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

function Layout() {
  return (
    <div className="App">
      <nav>
        <Link to="/" className='leftAlign'>Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">jobs</Link>
        <Link to="/profile">MyProfile</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

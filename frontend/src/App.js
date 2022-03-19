import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {
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

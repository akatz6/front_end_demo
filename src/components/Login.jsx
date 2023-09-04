import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const registerData = Object.fromEntries(data);
    let response;
    try {
      response = await axios.post(
        "http://localhost:3000/api/login",
        registerData
      );
      let d = new Date();
      d.setTime(d.getTime() + 59 * 60 * 1000);
      Cookies.set("loggedIn", response.data, { expires: d });
      navigate("/")
      location.reload();
    } catch (e) {
      const error = e.response;
      console.log(error);
    }
  };
  return (
    <div className="registerForm">
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="admin_name"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="admin_password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

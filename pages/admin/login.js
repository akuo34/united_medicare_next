import { useAuth } from '../../contexts/auth';

const Login = () => {

  const { login } = useAuth();

  return (
    <div className="page-admin">
      <div className="container-login">
        <h4>Sign in</h4>
        <form id="form-login" onSubmit={login}>
          <input
            className="input-login"
            name="login"
            placeholder="E.g: johnDorian123@gmail.com"
            id="login"
          />
          <input
            className="input-login"
            type="password"
            name="password"
            placeholder="Your password"
            id="password"
          />
          <div className="container-landing-button">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
import { setStorage } from "./simple-storage";
import { login, register, logout } from "./auth.service";

export const doLogin = async (e, navigate) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const res = await login({ username, password });
  
    const { auth, access_token, refresh_token } = res;
  
    setStorage('isAuth', auth);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);
  
    navigate('/home');
  };
  
export const doRegister = (e, navigate) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    register({
      username,
      email,
      password,
    }).then(() => {
      navigate('/login');
    });
  };
  
export const doLogout = (e, navigate) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };
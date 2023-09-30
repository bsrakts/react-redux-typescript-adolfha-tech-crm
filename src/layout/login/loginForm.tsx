import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/loginSlice';
import { RootState } from '../../store/store';
import { Button, TextField } from '@mui/material';
import backgrounds from '.../assets/login-backgrounds.jpg';
import logo from '../assets/ADOLFHA.png';

const LoginForm: React.FC = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const error = useSelector((state: RootState) => state.login.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
        ...formValues,
        [e.target.name] : e.target.value
    })
}

const handleLogin = () => {
  dispatch(login(formValues));
  console.log('Login Button Clicked');
};

  if(isAuthenticated) {
    setTimeout(() => {
        navigate('/dashboard')
    }, 3000)
}

  return (
    <div className='flex md:flex-row flex-col h-screen justify-center items-center'>
      <div className="w-full h-screen loginImg">
        <img src={backgrounds} alt="Login Image" className="bg-blue-500 w-full h-full bg-contain" />
      </div>
      <div className='absolute bg-stone-300 bg-opacity-30 p-10 rounded-xl flex flex-col border-2 border-stone-300 shadow-lg shadow-stone-500'>
      <div className="w-2/3 mx-auto flex justify-center mb-8">
        <img src={logo} alt="Logo" className="bg-transparent w-full h-full bg-contain" />
      </div>
      <TextField id="standard-basic" label="username" name="username" variant="standard" value={formValues.username} onChange={handleChange} className='mb-4'/>
      <TextField id="standard-basic" label="password" name="password" variant="standard" value={formValues.password} onChange={handleChange}/>
      <div className='mt-8 flex w-2/4 justify-center bg-slate-900 bg-opacity-40 mx-auto border border-stone-900 shadow shadow-stone-700'>
      <Button variant="contained" onClick={handleLogin} className='w-full rounded-xl' color='inherit'>Sign In</Button>
      </div>
      {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;

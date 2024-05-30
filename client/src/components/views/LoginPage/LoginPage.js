import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        console.log(res.payload.loginSuccess);
        navigate('/');
      } else {
        alert('로그인 실패');
      }
    });

    axios
      .post('/api/users/login', body)

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;

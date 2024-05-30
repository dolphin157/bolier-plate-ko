import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/hello')
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    axios.get('/api/users/logout').then((res) => {
      if (res.data.success) {
        navigate('/login');
      } else {
        console.log('로그아웃 실패');
      }
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
      <h2>시작 페이지</h2>

      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default LandingPage;

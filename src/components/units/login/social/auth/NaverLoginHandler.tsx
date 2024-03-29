import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/apis/loginapi';

const NaverLoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const [dots, setDots] = useState('.');
  const state = '99999';
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '.' : prevDots + '.'));
    }, 500);
    const KakaoLogin = async () => {
      try {
        const response = await axiosInstance.post(
          `/naver/callback`,
          {
            code: code,
            state: state,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['refreshtoken'];
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/main');
        window.location.reload();
      } catch (error) {
        alert("인터넷 오류입니다.");
      }
    };
    KakaoLogin();
    return () => clearInterval(intervalId);
  }, [code, navigate]);

  return <></>;
};

export default NaverLoginHandler;

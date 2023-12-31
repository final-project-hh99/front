import styled from 'styled-components';

export const Base = styled.div`
  width: 100%;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Dlatlbox = styled.div`
  width: cover;
  height: 30vw;
  border: 1px solid black;
  border-radius: 20px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const OnboardTitle = styled.div`
  margin-top: 120px;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  color: #391d93;
`;

export const OnboardContent = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 16px;
  color: #3d3d3d;
`;

export const Button = styled.button`
  width: 90.55%;
  height: 6.15%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #aaa;
  color: white;
  cursor: pointer;
  margin-top: 50px;
  font-size: 25px;
`;

export const UnderBallList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const UnderBall = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f5f2ff;
  margin-right: 10px;
  cursor: pointer;
`;

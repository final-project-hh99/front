/* eslint-disable */
import styled, { keyframes } from 'styled-components';

interface BoardWriteDiaryProps {
  color: string;
  fontColor: boolean;
}

interface WidthProps {
  width: string;
}

export const DiaryContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 960px;
  overflow: hidden;
  background-color: white;
`;

export const DiaryWrapperUPDiv = styled.div`
  width: 100%;
  min-height: 100px;
  position: relative;
`;

export const DiaryWrapperDOWNdiv = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: white;
  height: 775px;
  border-radius: 5px;
  background: rgba(245, 242, 255, 0.3);
  box-shadow: 0px 4px 2px 0px rgba(80, 53, 166, 0.2),
    0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset,
    0px 4px 20px 0px rgba(80, 53, 166, 0.2);
  backdrop-filter: blur(15px);
  padding: 6px;
  box-sizing: border-box;
  backdrop-filter: blur(15px);
`;

export const HeaderButtonBoxDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  position: absolute;
  bottom: 50px;
`;

export const HeaderLineDone = styled.div<WidthProps>`
  width: ${(props) => props.width};
  height: 2px;
  background-color: rgba(57, 29, 147, 0.5);
  margin: 0 auto;
  position: absolute;
  z-index: 5;
  transform: ${(props) => (props.width === '75px' ? 'translateX(-35px)' : '')};
`;

export const HeaderLine = styled.div`
  width: 150px;
  height: 2px;
  background-color: #ece9f5;
  margin: 0 auto;
  position: absolute;
  z-index: 1;
`;

export const HeaderFlexBox = styled.div`
  width: 200px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
`;

export const DoneCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-10px);
`;

export const OneBlackSpan = styled.div`
  width: 17.862px;
  height: 18px;
  position: absolute;
  z-index: 12;

  border-radius: 45px;
  background: radial-gradient(
        circle at 100% 100%,
        #ffffff 0,
        #ffffff 6px,
        transparent 6px
      )
      0% 0%/8px 8px no-repeat,
    radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 6px, transparent 6px)
      100% 0%/8px 8px no-repeat,
    radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 6px, transparent 6px)
      0% 100%/8px 8px no-repeat,
    radial-gradient(circle at 0 0, #ffffff 0, #ffffff 6px, transparent 6px) 100%
      100%/8px 8px no-repeat,
    linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 4px)
      calc(100% - 16px) no-repeat,
    linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 16px)
      calc(100% - 4px) no-repeat,
    linear-gradient(
      319deg,
      rgba(255, 255, 255, 0.7) 51%,
      rgba(80, 53, 166, 0.77) 100%
    ),
    linear-gradient(
      128deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(80, 53, 166, 0.77) 100%
    ),
    radial-gradient(at 0% 0%, rgba(80, 53, 166, 0.2) 0%, transparent 70%),
    linear-gradient(
      44deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(80, 53, 166, 0.2) 100%
    );
  box-sizing: border-box;

  box-shadow: 0px 4px 2px 0px rgba(80, 53, 166, 0.2),
    0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset,
    0px 4px 20px 0px rgba(80, 53, 166, 0.2);
  backdrop-filter: blur(15px);
`;

export const TwoBlankSpan = styled.div`
  width: 18px;
  height: 18px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

export const SelectBox = styled.div`
  width: 75px;
  height: 37px;
  transform: translateY(8px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ThreeFilledSpan = styled.div`
  width: 17.862px;
  height: 18px;

  z-index: 10;

  border-radius: 50%;
  border: 1px solid var(--glassmorphism-line, rgba(80, 53, 166, 0.77));

  background: var(--1, #5035a6);
  box-shadow: 0px 4px 2px 0px rgba(80, 53, 166, 0.2),
    0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset,
    0px 4px 20px 0px rgba(80, 53, 166, 0.2);
  backdrop-filter: blur(15px);
`;

export const SelectP = styled.div`
  color: ${(props) => (props.color === 'now' ? '#5035a6' : '#ece9f5')};
  font-size: 15px;
  font-weight: 700;
  margin-top: 2px;
  transform: ${(props) => (props.color === 'now' ? '' : 'translateY(100%)')};
`;

export const DiaryTitleDiv = styled.div`
  width: 100%;
  margin: 15px 0 15px 0;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--Black, #222122);
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const DiarySpan = styled.span`
  color: var(--Black, #222122);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const DiaryWriteTitleH3 = styled.p`
  text-align: left;
  color: var(--Black, #222122);
  font-size: 18px;
  font-weight: 300;
`;

export const FortuneContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 200px;

  border-radius: 10px;
  background: #f5f2ff;

  box-shadow: 0px 4px 20px 0px rgba(80, 53, 166, 0.1) inset;
  backdrop-filter: blur(15px);

  position: relative;
`;

export const FortuneFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const FortuneBox = styled.div`
  width: 60%;
  text-align: center;
  margin-right: 20px;
  position: absolute;
  right: 0;
`;

export const FortuneP = styled.p`
  color: var(--1, #5035a6);
  text-align: center;
  font-size: 15px;
  font-weight: 300;
`;

export const AlreadyTookFortune = styled.div`
  font-size: 10px;
`;

export const FortuneGoDiv = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: var(--1, #5035a6);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  transform: translateX(60px);

  cursor: pointer;
`;

export const FooterButtonBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const ContentsWrapperDiv = styled.div`
  width: 100%;
  height: 80%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImagePlustButtonBox = styled.div``;

export const HiddenInput = styled.input`
  display: none;
`;

export const ImageBoxDiv = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

export const PicutureImg = styled.img`
  width: 300px;
  height: 300px;
`;

export const ImageButton = styled.button``;

export const AddEmotionButton = styled.button`
  width: 200px;
`;

export const PlusDiaryButton = styled.button`
  width: 200px;
  border: 3px solid blue;
  height: 50px;
  background-color: green;
`;

export const InputBoxDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentsTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-family: 'KyoboHand', sans-serif;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid rgba(239, 170, 173, 0.7);

  background: rgba(236, 233, 245, 0.8);

  box-shadow: 0px 4px 20px 0px rgba(80, 53, 166, 0.1) inset;
  backdrop-filter: blur(15px);

  &&focus {
    outline: none;
  }
  padding: 50px;
`;

export const InputDiv = styled.div`
  width: 100%;
  height: 250px;
  transform: translateY(-20px);
`;

export const InputFooterBoxDiv = styled.div`
  width: 300px;
  height: 30px;
  display: flex;
  justify-content: end;
`;

export const TextAreaCount = styled.p`
  margin: 0px;
  color: #5035a6;
  font-size: 15px;
  font-weight: 300;
  transform: translate(-10px, 50px);
  z-index: 20;
`;

export const DiaryPrivateCheckboxDiv = styled.div`
  width: 47px;
  height: 47px;
  border: 5px solid #d0cecd;
  border-radius: 13px;
`;

export const OpenPublicP = styled.p`
  margin-top: 5px;
  color: #d0cecd;
`;

export const Validate = styled.div<BoardWriteDiaryProps>`
  width: 100%;
  height: 30px;
  text-align: center;
  color: ${(props) =>
    !props.color ? (!props.fontColor ? 'red' : '#999') : 'transparent'};
  margin: 0;
  font-weight: ${(props) =>
    !props.color ? (!props.fontColor ? '500' : '400') : ''};
  transform: translateY(50px);
`;

const gelatineAnimation = keyframes`
from, to { transform: scale(0.9, 0.9); }
25% { transform: scale(0.9, 1); }
50% { transform: scale(1, 0.9); }
75% { transform: scale(0.95, 1); }
`;

export const FalseCookieImage = styled.img`
  width: 30%;
  transform: scale(0.8);
  animation: ${gelatineAnimation} 1s infinite;
  position: absolute;
  left: 12px;
  cursor: pointer;
`;

export const FalseCloudP = styled.p`
  position: absolute;
  left: 43px;
  z-index: 20;
  color: white;
  transition: color 0.3s;
  font-weight: 500;
  cursor: pointer;
`;

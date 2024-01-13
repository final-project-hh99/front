import React, { useState } from 'react';
import * as S from './Main.styles';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import * as DOMPurify from 'dompurify';

const ViewAllInfinite = (props: any) => {
  const formattedDate = format(new Date(props.item.createdAt), 'yyyy. MM. dd');
  const navigate = useNavigate();

  const onClickGotoDetailPage = (id: any) => {
    navigate(`/post/${id}`);
  };

  const weather = props.item.weather;
  const countAverage = props.item.EmotionStatus;
  const isPublic = props.item.isPublic;
  const [emotionPicture, setEmotionPicture] = useState('');
  const [isPublicPicture, setIsPublicPicture] = useState('');

  switch (true) {
    case isPublic === true:
      if (isPublicPicture !== '/Public.png') {
        setIsPublicPicture('/Public.png');
      }
      break;
    case isPublic === false:
      if (isPublicPicture !== '/Private.png') {
        setIsPublicPicture('/Private.png');
      }
      break;
    default:
      // console.log('아무것도 아님');
      break;
  }

  ///퍼블릭, ture
  switch (true) {
    case weather === '1' && countAverage <= 1.6:
      if (emotionPicture !== '/rain_sad.webp') {
        setEmotionPicture('/rain_sad.webp');
      }
      break;
    case weather === '1' && countAverage > 1.6 && countAverage <= 3.3:
      if (emotionPicture !== '/rain_soso.webp') {
        setEmotionPicture('/rain_soso.webp');
      }
      break;
    case weather === '1' && countAverage > 3.3 && countAverage <= 5:
      if (emotionPicture !== '/rain_happy.webp') {
        setEmotionPicture('/rain_happy.webp');
      }
      break;
    case weather === '2' && countAverage <= 1.6:
      if (emotionPicture !== '/cloud_sad.webp') {
        setEmotionPicture('/cloud_sad.webp');
      }
      break;
    case weather === '2' && countAverage > 1.6 && countAverage <= 3.3:
      if (emotionPicture !== '/cloud_soso.webp') {
        setEmotionPicture('/cloud_soso.webp');
      }
      break;
    case weather === '2' && countAverage > 3.3 && countAverage <= 5:
      if (emotionPicture !== '/cloud_happy.webp') {
        setEmotionPicture('/cloud_happy.webp');
      }
      break;
    case weather === '3' && countAverage <= 1.6:
      if (emotionPicture !== '/sun_sad.webp') {
        setEmotionPicture('/sun_sad.webp');
      }
      break;
    case weather === '3' && countAverage > 1.6 && countAverage <= 3.3:
      if (emotionPicture !== '/sun_soso.webp') {
        setEmotionPicture('/sun_soso.webp');
      }
      break;
    case weather === '3' && countAverage > 3.3 && countAverage <= 5:
      if (emotionPicture !== '/sun_happy.webp') {
        setEmotionPicture('/sun_happy.webp');
      }
      break;
    default:
      // console.log('아무것도 아님');
      break;
  }

  return (
    <>
      <S.ViewAllEachBoxDiv
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 1 }}
        onClick={() => onClickGotoDetailPage(props.item.diaryId)}
      >
        <S.ViewAllEachFlex>
          <S.ViewAllIMGbox>
            <img src={props.item.image} alt='expic' style={mainInageStyle} />
          </S.ViewAllIMGbox>
          <S.ViewAllRightContentDiv>
            <S.ViewAllRightFlexDiv>
              <S.ViewAllEmojiIMGDiv>
                <img src={emotionPicture} style={imgstyle} alt='감정이모티콘' />
              </S.ViewAllEmojiIMGDiv>
              <S.ViewAllPublicIMGDiv>
                <img
                  src={isPublicPicture}
                  style={publicStyle}
                  alt='공개여부이모티콘'
                />
                {props.item.isPublic}
              </S.ViewAllPublicIMGDiv>
            </S.ViewAllRightFlexDiv>
            <S.ViewAllDateDiv>{formattedDate}</S.ViewAllDateDiv>

            <S.ViewAllContentP
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(props.item.content)),
              }}
            ></S.ViewAllContentP>
          </S.ViewAllRightContentDiv>
        </S.ViewAllEachFlex>
      </S.ViewAllEachBoxDiv>
    </>
  );
};

export default ViewAllInfinite;

const imgstyle = {
  width: '50px',
  height: '50px,',
};

const mainInageStyle = {
  width: '90%',
  height: '90%',
};

const publicStyle = {
  width: '80%',
  height: '80%',
};

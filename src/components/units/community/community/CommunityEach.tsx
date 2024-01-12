import * as S from './CommunityMain.style';
import { useNavigate } from 'react-router-dom';
import * as DOMPurify from 'dompurify';
import { VideoCard } from 'src/components/commons/utills/Date/date';
import { useRecoilState } from 'recoil';
import { arrowNavigate } from 'src/states/navigate';
import useSetEmotionIcon from 'src/components/commons/hooks/useSetEmotionIcon';
import { useState } from 'react';

const CommunityEach = (props: any) => {
  const createdAtDate = new Date(props.item.createdAt);
  const [isGoingToMain, setIsGoingToMain] = useRecoilState(arrowNavigate);
  const weather = props.item.weather;
  const countAverage = props.item.EmotionStatus;
  const { emotionPicture } = useSetEmotionIcon(weather, countAverage);
  const [hover, setHover] = useState(false);

  if (createdAtDate) {
    createdAtDate.setHours(createdAtDate.getHours() - 9);
  }

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const navigate = useNavigate();

  const onClickGotoDetailPage = (id: number) => {
    navigate(`/post/${id}`);
    setIsGoingToMain(false);
  };

  // const whileHoverFunc = () => {};

  return (
    <>
      <S.ViewAllEachBoxDiv
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 1 }}
        onClick={() => onClickGotoDetailPage(props.item.diaryId)}
      >
        <S.ViewAllEachFlex>
          <S.ViewAllIMGbox>
            <img src={props.item.image} alt='그림일기' style={mainImageStyle} />
          </S.ViewAllIMGbox>
          <S.ViewAllRightContentDiv>
            <S.ViewAllRightFlexDiv>
              <S.ViewAllEmojiIMGDiv>
                <img src={emotionPicture} style={imgstyle} alt='감정이모티콘' />
              </S.ViewAllEmojiIMGDiv>
              <S.ViewAllPublicIMGDiv>
                {VideoCard(createdAtDate)}
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

export default CommunityEach;

const imgstyle = {
  width: '50px',
  height: '50px,',
};

const mainImageStyle = {
  width: '90%',
  height: '90%',
};

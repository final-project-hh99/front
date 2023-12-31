import React, { useState } from 'react';
import * as S from './BoardDetailContents.styles';
import Animation2 from 'src/components/commons/utills/Animation/Animation2';
import getEmotion from 'src/components/commons/utills/emotionImage';
import BoardDetailFooter from '../boardDetailFooter/BoardDetailFooter';
import useSliderCounts from 'src/components/commons/hooks/useSliderCounts';
import * as DOMPurify from 'dompurify';
import { IBoardDetailContents } from './BoardDetailContents.types';
import { useRecoilState } from 'recoil';
import {
  isActiveDeleteModal,
  isActiveEditModal,
} from 'src/states/detailedPageModal';
import Animation3 from 'src/components/commons/utills/Animation/Animation3';
import DiaryDeleteOverlay from 'src/components/commons/modals/modalSetting/overlay/diaryDeleteOverlay/DiaryDeleteOverlay';
import EditOverlay from 'src/components/commons/modals/modalSetting/overlay/editOverlay/EditOverlay';

const BoardDetailContents: React.FC<IBoardDetailContents> = ({
  detailedContent,
  comment,
  data,
  profile,
  setIsEdit,
}) => {
  const [isActiveModal, setIsActiveModal] = useRecoilState(isActiveEditModal);
  const [isDelete, setIsDelete] = useRecoilState(isActiveDeleteModal);
  const { temperatureHandle, humidHandle, sleepHandle } =
    useSliderCounts(detailedContent);

  const [isClickedPencil, setIsClickedPencil] = useState(false);

  const countAverage =
    (Number(data?.data?.temperature) + Number(data?.data?.humid)) / 2;

  const onClickEdit = () => {
    setIsActiveModal((prev) => !prev);
    setIsClickedPencil(false);
  };

  const onClickPencilImg = () => {
    setIsClickedPencil((prev) => !prev);
  };

  const onClickDeleteBtn = () => {
    setIsDelete((prev) => !prev);
    setIsClickedPencil(false);
  };

  return (
    <Animation2>
      {isActiveModal && (
        <EditOverlay
          content={detailedContent?.content}
          onClose={onClickEdit}
          detailedContent={detailedContent}
          setIsEdit={setIsEdit}
          setIsClickedPencil={setIsClickedPencil}
        />
      )}
      <S.ContentsWrapperDiv>
        {isDelete && <DiaryDeleteOverlay onClose={onClickDeleteBtn} />}
        <S.ContentsHeaderDiv>
          <S.CloudImg
            src={getEmotion(countAverage, data?.data?.weather)}
            alt='구름'
          />
          <S.ConentsHeaderRightDiv>
            <S.heartBoxDiv>
              <div>
                <S.CategoryText>마음 온도</S.CategoryText>
                <S.StatusBoxDiv>
                  <S.MindStatusSpan>{temperatureHandle()}</S.MindStatusSpan>
                </S.StatusBoxDiv>
              </div>
              <div>
                <S.CategoryText>마음 습도</S.CategoryText>
                <S.StatusBoxDiv>
                  <S.MindStatusSpan>{humidHandle()}</S.MindStatusSpan>
                </S.StatusBoxDiv>
              </div>
              <div>
                <S.CategoryText>마음 일출</S.CategoryText>
                <S.StatusBoxDiv>
                  <S.MindStatusSpan>{sleepHandle()}</S.MindStatusSpan>
                </S.StatusBoxDiv>
              </div>
            </S.heartBoxDiv>
          </S.ConentsHeaderRightDiv>
        </S.ContentsHeaderDiv>
        <S.PencilsBoxDiv>
          {isClickedPencil && (
            <Animation3>
              <S.EditPencilDiv>
                <S.EditSpan onClick={onClickEdit}>일기 수정</S.EditSpan>
                <S.DeleteSpan onClick={onClickDeleteBtn}>
                  일기 삭제
                </S.DeleteSpan>
              </S.EditPencilDiv>
            </Animation3>
          )}
          {profile?.data?.userId === data?.data?.UserId && (
            <S.DotWrapperDiv
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClickPencilImg}
            >
              <S.PencilImg src='/dotdotdotdot.png' alt='수정버튼' />
            </S.DotWrapperDiv>
          )}
        </S.PencilsBoxDiv>
        <div>
          <S.ContentBoxHeaderDiv>
            <div></div>
          </S.ContentBoxHeaderDiv>
          <S.ContentsBoxDiv>
            <S.ContentBoxDiv>
              <S.ContentSpan
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(detailedContent?.content)),
                }}
              ></S.ContentSpan>
            </S.ContentBoxDiv>
          </S.ContentsBoxDiv>
          <S.ContentsFooterDiv>
            <S.SentenceSpan>{detailedContent?.sentence}</S.SentenceSpan>
          </S.ContentsFooterDiv>
        </div>
        <div>
          <BoardDetailFooter
            detailedContent={detailedContent}
            comment={comment}
            data={data}
          />
        </div>
      </S.ContentsWrapperDiv>
    </Animation2>
  );
};

export default BoardDetailContents;

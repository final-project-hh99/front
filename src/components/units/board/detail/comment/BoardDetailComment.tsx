import React, { ChangeEvent, useState } from 'react';
import * as S from './BoardDetailComment.styles';
import { useMutation, useQueryClient } from 'react-query';
import {
  addComment,
  deleteComment,
  editComment,
} from 'src/apis/cheolmin-api/apis';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { IComment, ICommentMap } from './BoardDetailComment.types';
import alertUnit from 'src/components/commons/utills/Alert/alertUnit';
const BoardDetailComment: React.FC<IComment> = ({
  detailedContent,
  profile,
  comment,
}) => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const params = useParams();
  const diaryId = params.id;

  const createdAtDate: Date | '' = comment?.data?.createdAt
    ? new Date(comment?.data?.createdAt)
    : '';

  if (createdAtDate) {
    createdAtDate.setHours(createdAtDate.getHours() - 9);
  }

  const comments = comment?.data;

  const commentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comment');
    },
  });

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comment');
    },
  });

  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comment');
    },
  });

  const onClickSubmitBtn = () => {
    if (content.trim() === '') {
      alertUnit(
        '<span style="font-size: 24px; font-weight: bolder;">댓글을 입력해주세요.</span>'
      );
      return;
    }
    commentMutation.mutate({ content, diaryId });
    setContent('');
  };

  const handleOnKeyPress = (event: any) => {
    if (Swal.isVisible()) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      onClickSubmitBtn();
    }
  };

  const onClickEditBtn =
    (commentId: any, userId: number, content: string) => () => {
      setEditingCommentId(commentId);
      Swal.fire({
        width: '400px',
        title:
          '<span style="font-size: 24px; font-weight: bolder;">수정할 내용을 입력하세요</span>',
        input: 'text',
        inputValue: content,
        confirmButtonText: '수정하기',
        cancelButtonText: '취소하기',
        showCancelButton: true,
        reverseButtons: true,
        inputValidator: (value) => {
          if (!value) {
            return '수정할 내용을 입력하세요';
          }
          if (value.length > 20) {
            return '20자만 입력이 가능합니다.';
          }
          return '';
        },
      }).then((editResult) => {
        if (editResult.isConfirmed) {
          const message = editResult.value;
          if (message && message.length <= 20) {
            editMutation.mutate({ message, commentId });
          }
        }
      });
    };

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setContent(e.target.value);
    } else {
      alertUnit(
        '<span style="font-size: 24px; font-weight : bolder;">댓글은 20자 까지만 가능합니다.</span>'
      );
    }
  };

  const onClickDeleteBtn = (commentId: any, userId: number) => () => {
    Swal.fire({
      icon: 'error',
      width: '400px',
      title:
        '<span style="font-size: 24px; font-weight : bolder;">댓글을 삭제 하시겠습니까 ?</span>',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(commentId);
      }
    });
  };

  return (
    <div>
      {comments.length === 0 && (
        <div>
          {detailedContent.isPublic === true && (
            <S.CommentsWrapperDiv>
              <S.CommentBox>
                <S.CommentHeaderDiv></S.CommentHeaderDiv>
                <S.CommentFooterWrapDiv>
                  <S.InputBoxDiv
                    placeholder='일기에 댓글을 달아보세요'
                    value={content}
                    onChange={onChangeComment}
                    onKeyDown={handleOnKeyPress}
                  />
                  <S.SubmitButton onClick={onClickSubmitBtn}>
                    입력
                  </S.SubmitButton>
                </S.CommentFooterWrapDiv>
              </S.CommentBox>
              {content.length !== 0 && (
                <S.CountCheckSpan>{content.length}/20</S.CountCheckSpan>
              )}
            </S.CommentsWrapperDiv>
          )}
          {detailedContent.isPublic === false && (
            <S.NoCommentBoxDiv>
              <S.NoCommentSpan>
                전체공개로 전환해 사람들과 일기를 공유해보세요!
              </S.NoCommentSpan>
            </S.NoCommentBoxDiv>
          )}
        </div>
      )}
      {comments.length !== 0 && (
        <div>
          <S.CommentsWrapperDiv>
            <S.CommentBox>
              <S.CommentHeaderDiv>
                {comments?.map((el: ICommentMap) => (
                  <S.CommentWrapperDiv key={el.commentId}>
                    <S.CommentBoxDiv>
                      <S.ProfileImg src={el?.User?.profileImg} alt='타원' />
                      <S.CommentWriterBoxDiv>
                        <S.DateBoxDiv>
                          <S.CommentWriterSpan>
                            {el?.User?.username}
                          </S.CommentWriterSpan>
                          {profile?.data?.userId === el.UserId && (
                            <S.CommentSettingDiv>
                              <S.EditTextSpan
                                onClick={onClickEditBtn(
                                  el.commentId,
                                  el.UserId,
                                  el.content
                                )}
                              >
                                수정
                              </S.EditTextSpan>
                              <S.DeleteTextSpan
                                onClick={onClickDeleteBtn(
                                  el.commentId,
                                  el.UserId
                                )}
                              >
                                삭제
                              </S.DeleteTextSpan>
                            </S.CommentSettingDiv>
                          )}
                        </S.DateBoxDiv>
                        <S.ButtonWrapperDiv>
                          <S.CommentContent>{el.content}</S.CommentContent>
                        </S.ButtonWrapperDiv>
                      </S.CommentWriterBoxDiv>
                    </S.CommentBoxDiv>
                  </S.CommentWrapperDiv>
                ))}
              </S.CommentHeaderDiv>
            </S.CommentBox>
            {detailedContent.isPublic === true && (
              <S.CommentFooterWrapDiv>
                <div>
                  <S.BlankDiv>
                    <S.InputBoxDiv
                      placeholder='댓글을 작성해보세요.'
                      value={content}
                      onChange={onChangeComment}
                      onKeyDown={handleOnKeyPress}
                    />
                    <S.SubmitButton onClick={onClickSubmitBtn}>
                      등록
                    </S.SubmitButton>
                  </S.BlankDiv>
                  {content.length !== 0 && (
                    <S.CountCheckSpan>{content.length}/200</S.CountCheckSpan>
                  )}
                </div>
              </S.CommentFooterWrapDiv>
            )}
            {detailedContent.isPublic === false && (
              <div>
                <S.BlankInput
                  placeholder='공개로 전환하면 다른 사용자가 댓글을 달 수 있어요'
                  value={content}
                  onChange={onChangeComment}
                  disabled
                />
              </div>
            )}
          </S.CommentsWrapperDiv>
        </div>
      )}
    </div>
  );
};

export default BoardDetailComment;

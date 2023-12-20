import React, {
  ChangeEvent,
  useEffect,
  useState,
  MutableRefObject,
  useRef,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { IMyPage } from './MyPageOverlay.types';
import * as S from './MyPageOverlay.styles';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  editMyInfo,
  editPassword,
  getMyInfo,
} from 'src/apis/cheolmin-api/apis';
import axios from 'axios';
import DeleteModal from '../../../delete/DeleteModal';

const MyPageOverlay: React.FC<IMyPage> = ({ onOk }) => {
  const queryClient = useQueryClient();
  const editMyInfoMutation = useMutation(editMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('myInfo');
    },
  });
  const { data } = useQuery('myInfo', getMyInfo);

  console.log('사진', data?.data);
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<File | null>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const buttonRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [preview, setPreview] = useState<string | null>(''); // Default preview state
  const [selectedImage, setSelectedImage] = useState<string | File>('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  const [isEditPW, setIsEditPW] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState('');
  const [
    confirmPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
  ] = useState('');

  const onChangeImg = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedImage(event.target.files?.[0]);
    }
  };
  console.log('selectedImage', selectedImage);
  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setPreview(null);
    }
  }, [imgFile]);

  const [isEdit, setIsEdit] = useState(false);

  const onClickModalDiv = (e: any) => {
    e.stopPropagation();
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
  };

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,20}$/;
    if (newPassword.trim() === '') {
      // 비밀번호가 비어 있다면 메시지 초기화
      setPasswordValidationMessage('');
    } else if (!passwordRegex.test(newPassword)) {
      // 비밀번호 유효성 검사 실패 시 메시지 표시
      setPasswordValidationMessage(
        '8~20자의 소문자, 숫자, 특수문자를 포함해야 합니다.'
      );
    } else {
      // 유효한 비밀번호인 경우 완료 메시지 표시
      setPasswordValidationMessage('완료');
    }
  };

  const onChangeConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    const confirmPasswordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]{8,20}$/;

    if (newConfirmPassword.trim() === '') {
      // 비밀번호가 비어 있다면 메시지 초기화
      setConfirmPasswordValidationMessage('');
    } else if (!confirmPasswordRegex.test(newConfirmPassword)) {
      // 비밀번호 유효성 검사 실패 시 메시지 표시
      setConfirmPasswordValidationMessage(
        '8~20자의 소문자, 숫자, 특수문자를 포함해야 합니다.'
      );
    } else if (newConfirmPassword !== newPassword) {
      // 비밀번호와 확인 비밀번호가 일치하지 않는 경우 메시지 표시
      setConfirmPasswordValidationMessage('비밀번호가 일치하지 않습니다.');
    } else {
      // 유효한 비밀번호인 경우 완료 메시지 표시
      setConfirmPasswordValidationMessage('완료');
    }
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event?.target.value);
  };

  const editMypageMutation = useMutation(editMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('myInfo');
      setIsEdit((prev) => !prev);
    },
  });

  const editPasswordMutation = useMutation(editPassword, {
    onSuccess: () => {
      // setIsEdit((prev) => !prev);
      // setIsEditPW((prev) => !prev);
      navigate('/main');
      queryClient.invalidateQueries('myPassword');
    },
    onError: () => {
      alert('현재 비밀번호가 일치하지 않습니다.');
    },
  });

  const onClickEditBtn = () => {
    const newProfile = {
      imgFile: selectedImage,
      username,
    };

    editMypageMutation.mutate(newProfile);

    navigate('/main');
  };

  const onClickPasswordChange = () => {
    editPasswordMutation.mutate({ password, newPassword });
  };
  const profileImage = localStorage.getItem('image');

  const onClickButton = () => {
    buttonRef.current.click();
  };

  const onClickToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickReset = () => {
    setIsEdit((prev) => !prev);
    setIsEditPW((prev) => !prev);
  };

  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiredTime');
    alert('로그아웃이 완료되었습니다.');
    navigate('/login');
  };
  const onClickUnRegister = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.delete(`${BASE_URL}/signoff`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
          Refreshtoken: `${refreshToken}`,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiredTime');
      alert(response.data.message);
      navigate('/login');
    } catch (error: any) {
      console.error('네트워크 오류', error.message);
      alert('네트워크 오류');
    }
  };

  const onClickChangePW = () => {
    setIsEditPW((prev) => !prev);
  };

  const onClickOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  return (
    <S.ContainerDiv onClick={onOk} className='modal'>
      <S.ModalContentDiv onClick={onClickModalDiv}>
        {isOpenModal && (
          <DeleteModal onOk={onClickUnRegister} onClose={onClickOpenModal} />
        )}
        <S.CancelImgBox>
          <S.CancelImg onClick={onOk} src='/cancel.png' alt='취소' />
        </S.CancelImgBox>
        <S.ContentsBoxDiv>
          <S.HeaderWrapperDiv></S.HeaderWrapperDiv>
          <S.ContentsWrapperDiv>
            <S.ImageBoxDiv>
              <S.ImageBoxDiv>
                {!data?.data.profileImg && (
                  <S.PicutureImg
                    src={profileImage || '/avatar.png'}
                    alt='엑박'
                  />
                )}
                {data?.data.profileImg && (
                  <S.ImageBoxDiv>
                    {!isEditPW && (
                      <S.PicutureImg src={data?.data.profileImg} alt='엑박' />
                    )}
                  </S.ImageBoxDiv>
                )}
              </S.ImageBoxDiv>
            </S.ImageBoxDiv>
            <S.ImagePlustButtonBox>
              <S.HiddenInput
                name='img'
                type='file'
                accept='image/*'
                onChange={onChangeImg}
                className='hidden'
                ref={buttonRef}
              />
              {isEdit && (
                <div>
                  {!isEditPW && (
                    <S.UploadBoxDiv>
                      <S.ImageButton onClick={onClickButton}>
                        사진 불러오기
                      </S.ImageButton>
                      <S.PictureDeleteSpan>현재 사진 삭제</S.PictureDeleteSpan>
                    </S.UploadBoxDiv>
                  )}
                </div>
              )}
            </S.ImagePlustButtonBox>
            <S.ContentsBoxDIv>
              <S.NameBoxDiv>
                <div>
                  {!isEdit && (
                    <div>
                      {!isEditPW && (
                        <S.MyinfoBoxDiv>
                          <S.NicknameSpan>{data?.data.username}</S.NicknameSpan>
                          <S.EmailSpan> {data?.data.email}</S.EmailSpan>
                        </S.MyinfoBoxDiv>
                      )}
                    </div>
                  )}

                  {isEditPW && (
                    <S.PasswordContainerDiv>
                      {isEditPW && (
                        <S.PasswordWrapperDiv>
                          <S.PasswordTitleSpan>
                            비밀번호 변경
                          </S.PasswordTitleSpan>
                          <S.PasswordSpan>현재 비밀번호</S.PasswordSpan>
                          <S.PasswordInput
                            onChange={onChangePassword}
                            type='password'
                          />
                          <S.PasswordSpan>새로운 비밀번호</S.PasswordSpan>
                          <S.PasswordInput
                            onChange={onChangeNewPassword}
                            type='password'
                          />
                          <S.ValidationMessage
                            isError={passwordValidationMessage !== '완료'}
                          >
                            {passwordValidationMessage}
                          </S.ValidationMessage>
                          <S.PasswordSpan>새 비밀번호 확인</S.PasswordSpan>
                          <S.PasswordInput
                            onChange={onChangeConfirmPasswordChange}
                            type='password'
                          />
                          <S.ValidationMessage
                            isError={
                              confirmPasswordValidationMessage !== '완료'
                            }
                          >
                            {confirmPasswordValidationMessage}
                          </S.ValidationMessage>
                        </S.PasswordWrapperDiv>
                      )}
                    </S.PasswordContainerDiv>
                  )}
                </div>
                {isEdit && (
                  <div>
                    {!isEditPW && (
                      <S.NewNameWrapperDiv>
                        <S.UsernameSpan>사용자 이름</S.UsernameSpan>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <S.NameInput
                            onChange={onChangeUsername}
                            type='text'
                            placeholder={data?.data.username}
                          />
                          <div></div>
                          <S.ChangePasswordSpan onClick={onClickChangePW}>
                            비밀번호를 변경하려면 여기를 누르세요
                          </S.ChangePasswordSpan>
                        </div>
                      </S.NewNameWrapperDiv>
                    )}
                  </div>
                )}
              </S.NameBoxDiv>
              <div>
                <span></span>
              </div>
            </S.ContentsBoxDIv>
          </S.ContentsWrapperDiv>
          <S.ButtonWrapperDiv>
            {!isEdit && (
              <S.ButtonBoxDiv>
                <S.EditButton onClick={onClickToggle}>수정하기</S.EditButton>
                <S.SignButtonDiv>
                  <S.SignText onClick={onClickLogout}>로그아웃</S.SignText>
                  <S.SignText onClick={onClickOpenModal}>회원탈퇴</S.SignText>
                </S.SignButtonDiv>
              </S.ButtonBoxDiv>
            )}
            {isEdit && (
              <div>
                {!isEditPW && (
                  <div>
                    <S.CancelButton onClick={onClickToggle}>
                      취소하기
                    </S.CancelButton>
                    <S.SubmitButton onClick={onClickEditBtn}>
                      등록하기
                    </S.SubmitButton>
                  </div>
                )}
                {isEditPW && (
                  <S.PasswordConfirmDiv>
                    <S.CancelButton onClick={onClickReset}>
                      취소하기
                    </S.CancelButton>
                    <S.SubmitButton onClick={onClickPasswordChange}>
                      변경하기
                    </S.SubmitButton>
                  </S.PasswordConfirmDiv>
                )}
              </div>
            )}
          </S.ButtonWrapperDiv>
        </S.ContentsBoxDiv>
      </S.ModalContentDiv>
    </S.ContainerDiv>
  );
};

export default MyPageOverlay;

import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userPointState } from '../../recoil/userPointState';
import { uploadSuccessState } from '../../recoil/uploadSuccessState';
import PlainButton from '../../components/Button/PlainButton';
import { modalState } from '../../recoil/detailState';
import { AxiosResponse } from 'axios';

interface IImageInputProps {
  src?: string;
  $imagePreview?: string | null;
}

export interface IUserPointData {
  cupStoreName: string;
  memberNickname: string;
  memberAccumulatedPoint: number;
  memberPoint: number;
  gainPoint: number;
}

export default function UploadImage() {
  const params = useParams();
  const cupStoreId = params.id;
  const token = localStorage.getItem('token');
  const [, fetchData] = useAxios<IUserPointData>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setIsModalOpen = useSetRecoilState(modalState);

  const setUserPointData = useSetRecoilState(userPointState);
  const setIsSuccess = useSetRecoilState(uploadSuccessState);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(String(reader.result));
    };
  };

  const submitImage = () => {
    if (imagePreview) {
      const base64Result = imagePreview.split(',')[1];
      setFileBase64(base64Result);

      fetchData(
        {
          url: '/api/upload-image',
          method: 'POST',
          headers: {
            Authorization: token,
          },
          data: { file: fileBase64, cupStoreId: cupStoreId },
        },
        handleResponse
      );
    }
  };

  const handleResponse = (response: AxiosResponse<IUserPointData>) => {
    const data: IUserPointData = response.data;

    setUserPointData(data);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(true);
    }, 1500);
    setFileBase64('');
  };

  return (
    <UploadContainer>
      <UploadBtn $imagePreview={imagePreview ?? `#d9d9d9`}>
        <UploadLabel htmlFor="uploadButton">
          <ImagePreview
            src="/images/uploadImage/default.png"
            $imagePreview={imagePreview}
          ></ImagePreview>
          {!imagePreview && (
            <AddIcon src="/images/uploadImage/addIcon.png"></AddIcon>
          )}
        </UploadLabel>
        <ImageInput
          type="file"
          accept="image/*"
          id="uploadButton"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpload(e)}
          ref={inputRef}
        />
      </UploadBtn>
      {imagePreview ? (
        <ButtonBox>
          <PlainButton
            width="half"
            text="재선택"
            event={() => inputRef.current?.click()}
            style="desactive"
          />
          <PlainButton
            width="half"
            text="제출하기"
            event={() => submitImage()}
            style="default"
          />
        </ButtonBox>
      ) : (
        <PlainButton
          width="full"
          text="반납 인증"
          event={() => submitImage()}
          style="default"
        />
      )}
    </UploadContainer>
  );
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBtn = styled.form<IImageInputProps>`
  width: 100%;
  height: 486px;
  margin: 0 auto 38px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.$imagePreview});
  background-color: ${(props) => props.$imagePreview};
  object-fit: cover;
  background-size: cover;
  background-position: center;
  &:hover {
    cursor: pointer;
  }
`;

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ImagePreview = styled.img<IImageInputProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) =>
    !props.$imagePreview || props.$imagePreview === '#d9d9d9'
      ? 'block'
      : 'none'};
`;

const AddIcon = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const ImageInput = styled.input<IImageInputProps>`
  width: 334px;
  height: 486px;
  display: none;
  position: absolute;
  z-index: 90;
  border: 1px solid red;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

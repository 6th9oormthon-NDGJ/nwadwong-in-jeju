import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userPointState } from '../../recoil/userPointState';
import { uploadSuccessState } from '../../recoil/uploadSuccessState';

interface ImageInputProps {
  src?: string;
  $imagePreview?: string | null;
}

export interface UserPointDataType {
  cupStoreName: string;
  memberNickname: string;
  memberAccumulatedPoint: number;
  memberPoint: number;
  gainPoint: number;
}

export default function UploadImage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [, , , fetchData] = useAxios();
  const setUserPointData = useSetRecoilState(userPointState);
  const setIsSuccess = useSetRecoilState(uploadSuccessState);
  const token = localStorage.getItem('token');
  const params = useParams();
  const cupStoreId = params.id;

  const [fileBase64, setFileBase64] = useState('');

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const roughResult = String(reader.result);
        setImagePreview(reader.result ? roughResult : '');

        if (roughResult) {
          const base64result = roughResult.split(',')[1];
          setFileBase64(base64result);
        }

        resolve();
      };
    });
  };

  const submitImage = () => {
    fetchData({
      url: '/api/upload-image',
      method: 'POST',
      headers: {
        Authorization: token,
      },
      data: { file: fileBase64, cupStoreId: cupStoreId },
    }).then((result: UserPointDataType) => {
      if (result) {
        setUserPointData(result);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        setImagePreview('#d9d9d9');
      }
    });
  };

  return (
    <UploadContainer>
      <UploadBtn $imagePreview={imagePreview ?? `#d9d9d9`}>
        <UploadLabel htmlFor="uploadButton">
          <ImagePreview
            src="/images/uploadImage/default.png"
            $imagePreview={imagePreview}
          ></ImagePreview>
          <AddIcon src="/images/uploadImage/addIcon.png"></AddIcon>
        </UploadLabel>
        <ImageInput
          type="file"
          accept="image/*"
          id="uploadButton"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onUpload(e)}
        />
      </UploadBtn>
      <SubmitBtn onClick={() => submitImage()}>제출하기</SubmitBtn>
    </UploadContainer>
  );
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBtn = styled.form<ImageInputProps>`
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

const ImagePreview = styled.img<ImageInputProps>`
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

const ImageInput = styled.input<ImageInputProps>`
  width: 334px;
  height: 486px;
  display: none;
  position: absolute;
  z-index: 90;
  border: 1px solid red;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #b4f3a8;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background-color: #a8e09d;
  }
`;

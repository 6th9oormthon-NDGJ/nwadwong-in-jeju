import { atom } from 'recoil';
import { commentDataType } from '../pages/StoreDetail/StoreDetail';

export const commentDataState = atom<commentDataType[]>({
  key: 'commentDataState',
  default: [
    {
      commentNickname: '',
      createdAt: '',
      content: '',
      commentId: 0,
      memberId: '',
    },
  ],
});

export const inputState = atom({
  key: 'inputState',
  default: '',
});

export const isEditState = atom({
  key: 'isEditState',
  default: false,
});

export const currentCommentIdState = atom({
  key: 'currentCommentIdState',
  default: 0,
});

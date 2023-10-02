import { atom } from 'recoil';
import { ICommentData } from '../pages/StoreDetail/StoreDetail';

export const commentDataState = atom<ICommentData[]>({
  key: 'commentDataState',
  default: [],
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

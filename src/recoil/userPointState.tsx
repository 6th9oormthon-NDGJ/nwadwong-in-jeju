import { atom } from 'recoil';
import { IUserPointData } from '../pages/UploadImage/UploadImage';

export const userPointState = atom<IUserPointData>({
  key: 'userPointState',
  default: {
    cupStoreName: '',
    memberNickname: '',
    memberAccumulatedPoint: 0,
    memberPoint: 0,
    gainPoint: 0,
  },
});

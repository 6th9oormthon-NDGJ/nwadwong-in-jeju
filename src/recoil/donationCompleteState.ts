import { atom } from 'recoil';

const donationCompleteState = atom<boolean>({
  key: 'donationState',
  default: false,
});

export default donationCompleteState;

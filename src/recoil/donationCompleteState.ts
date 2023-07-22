import { atom } from 'recoil';

const donationCompleteState = atom<{ point: number; complete: boolean }>({
  key: 'donationState',
  default: {
    point: 0,
    complete: false,
  },
});

export default donationCompleteState;

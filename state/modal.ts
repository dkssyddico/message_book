import { atom } from 'recoil';

type Status = 'inform' | 'warning' | 'success';

interface ModalInfo {
  open: boolean;
  message: string;
  status?: Status;
}

export const modalState = atom<ModalInfo>({
  key: 'modal',
  default: {
    open: false,
    message: '',
    status: 'inform',
  },
});

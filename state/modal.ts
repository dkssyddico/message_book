import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

type Status = 'inform' | 'warning' | 'success';

interface ModalInfo {
  open: boolean;
  message: string;
  status?: Status;
}

export const modalState = atom<ModalInfo>({
  key: `modalState/${uuidv4()}`,
  default: {
    open: false,
    message: '',
    status: 'inform',
  },
});

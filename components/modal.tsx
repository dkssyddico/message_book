import { cls } from '@libs/client/utils';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'state/modal';

export default function Modal() {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  useEffect(() => {
    if (modalInfo.open) {
      setTimeout(() => {
        setModalInfo({ open: false, message: '', status: 'inform' });
      }, 1500);
    }
  }, [modalInfo, setModalInfo]);

  return (
    <div
      className={cls(
        'absolute top-20 left-1/2 z-50 -translate-x-1/2 animate-down rounded-lg bg-orange-300 py-2 px-4 font-semibold tracking-wider text-white',
        modalInfo.status === 'inform'
          ? 'bg-blue-500'
          : modalInfo.status === 'warning'
          ? 'bg-red-500'
          : 'bg-green-500'
      )}
    >
      {modalInfo.message}
    </div>
  );
}

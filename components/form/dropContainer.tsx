import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ToggleButton from '@components/UI/toggleButton';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dropEndDateState, dropInfoState, dropStatusState } from 'state/form';

type DropContainerProps = {
  submitSuccess: boolean | undefined;
};

export default function DropContainer({ submitSuccess }: DropContainerProps) {
  const [open, setOpen] = useState(false);
  const setDropStatus = useSetRecoilState(dropStatusState);
  const [dropEndDate, setDropEndDate] = useRecoilState(dropEndDateState);
  const [{ account, accountOwner, minAmount }, setDropInfo] = useRecoilState(dropInfoState);

  const handleDropStatus = () => {
    setOpen((prev) => !prev);
    setDropStatus((prev) => !prev);
  };

  // TODO: 계좌번호 - 안들어가게 체크해야함, 아니면 어떻게 받을지 고민.
  const handleDropInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (open) {
      const { name, value } = e.currentTarget;
      setDropInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (submitSuccess) setOpen(false);
  }, [submitSuccess]);

  return (
    <section className='w-full space-y-2'>
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold'>드랍도 함께 진행하시겠습니까?</h3>
        <ToggleButton open={open} handleOpen={handleDropStatus} />
      </header>
      {open && (
        <section className='space-y-2'>
          <div className='space-y-4'>
            <label className='font-semibold'>모금 기한</label>
            <DatePicker
              className='w-full flex-1 rounded-full border-2 border-gray-300 p-2 text-center'
              selected={dropEndDate}
              dateFormat='yyyy년 MM월 dd일'
              onChange={(date: Date) => setDropEndDate(date)}
            />
          </div>
          <div className='flex flex-col space-y-4'>
            <label htmlFor='minAmount' className='font-semibold'>
              최소 금액
            </label>
            <input
              min='0'
              type='number'
              name='minAmount'
              id='minAmount'
              value={minAmount}
              onChange={handleDropInfoChange}
              className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center'
            />
          </div>
          <div className='flex flex-col space-y-4'>
            <label htmlFor='bank' className='font-semibold'>
              계좌 정보
            </label>
            <select
              id='bank'
              name='bank'
              onChange={handleDropInfoChange}
              className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center'
            >
              <option value=''>은행 선택</option>
              <option value='shinhan'>신한은행</option>
              <option value='woori'>우리은행</option>
            </select>
            <div className='space-y-2'>
              <label className='text-sm text-gray-500' htmlFor='account'>
                계좌번호는 특수문자(-) 없이 숫자만 입력해주세요!
              </label>
              <input
                id='account'
                name='account'
                className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center text-black'
                type='text'
                placeholder='계좌번호'
                onChange={handleDropInfoChange}
                value={account}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm text-gray-500' htmlFor='accountOwner'>
                예금주명은 계좌의 예금주와 정확하게 일치해야 해요.
              </label>
              <input
                id='accountOwner'
                name='accountOwner'
                className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center text-black'
                type='text'
                placeholder='예금주'
                onChange={handleDropInfoChange}
                value={accountOwner}
              />
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

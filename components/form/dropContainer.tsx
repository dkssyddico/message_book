import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ToggleButton from '@components/UI/toggleButton';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState } from 'recoil';
import { DropEndDateState, DropMinAmountState } from 'state/form';

export default function DropContainer() {
  const [open, setOpen] = useState(false);
  const [dropEndDate, setDropEndDate] = useRecoilState(DropEndDateState);
  const [minAmount, setMinAmount] = useRecoilState(DropMinAmountState);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value: amount } = e.currentTarget;
    setMinAmount(() => (+amount < 0 ? 0 : +amount));
  };

  return (
    <section className='w-full space-y-2'>
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold'>드랍도 함께 진행하시겠습니까?</h3>
        <ToggleButton open={open} handleOpen={() => setOpen((prev) => !prev)} />
      </header>
      {open && (
        <section className='space-y-2'>
          <form className='space-y-4'>
            <div className='space-y-4'>
              <label className='font-semibold'>모금 기한</label>
              <DatePicker
                className='w-full flex-1 rounded-full border-2 border-gray-300 p-2 text-center'
                selected={dropEndDate}
                onChange={(date: Date) => setDropEndDate(date)}
              />
            </div>
            <div className='flex flex-col space-y-4'>
              <label className='font-semibold'>최소 금액</label>
              <input
                type='number'
                value={minAmount}
                onChange={handleAmountChange}
                className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center'
              />
            </div>
            <div className='flex flex-col space-y-4'>
              <h2 className='font-semibold'>계좌 정보</h2>
              <select className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center'>
                <option value=''>은행 선택</option>
                <option value='shinhan'>신한은행</option>
                <option value='woori'>우리은행</option>
              </select>
              <div className='space-y-2'>
                <label className='text-sm text-gray-500' htmlFor='accountHolder'>
                  계좌번호는 특수문자(-) 없이 숫자만 입력해주세요!
                </label>
                <input
                  id='bankAccount'
                  className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center text-black'
                  type='text'
                  placeholder='계좌번호'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm text-gray-500' htmlFor='accountHolder'>
                  예금주명은 계좌의 예금주와 정확하게 일치해야 해요.
                </label>
                <input
                  id='accountHolder'
                  className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2 text-center text-black'
                  type='text'
                  placeholder='예금주'
                />
              </div>
            </div>
          </form>
        </section>
      )}
    </section>
  );
}

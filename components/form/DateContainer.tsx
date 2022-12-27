import DatePicker from 'react-datepicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import { endDateState, startDateState, TodayState } from 'state/form';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateContainer() {
  const today = useRecoilValue(TodayState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  const dateChange = (date: Date) => {
    setStartDate(date);
    setEndDate(date);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-2'>
        <label className='mb-10'>메세지북 시작일</label>
        <DatePicker
          showPopperArrow={false}
          dateFormat='yyyy년 MM월 dd일'
          selected={startDate}
          onChange={(date: Date) => dateChange(date)}
          startDate={startDate}
          selectsStart
          minDate={today}
          endDate={endDate}
          className='w-full flex-1 rounded-full border-2 border-gray-300 text-center'
        />
      </div>
      <div className='space-y-2'>
        <label>메세지북 종료일</label>
        <DatePicker
          showPopperArrow={false}
          dateFormat='yyyy년 MM월 dd일'
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectsEnd
          className='w-full flex-1 rounded-full border-2 border-gray-300 text-center'
        />
      </div>
    </div>
  );
}

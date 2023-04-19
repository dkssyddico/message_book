import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

type Hashtag = string;

type Thumbnail = File | null;

type DropInfo = {
  account: string;
  accountOwner: string;
  minAmount: number;
  bank: string;
};

type Question = {
  content: string;
  required: boolean;
  index: number;
};

export const TodayState = atom<Date>({
  key: `todayState/${uuidv4()}`,
  default: new Date(),
});

export const startDateState = atom<Date>({
  key: `startDate/${uuidv4()}`,
  default: new Date(),
});

export const endDateState = atom<Date>({
  key: `endDate/${uuidv4()}`,
  default: new Date(),
});

export const hashtagsState = atom<Hashtag[]>({
  key: `hashtagsState/${uuidv4()}`,
  default: [],
});

export const questionsState = atom<Question[]>({
  key: `questionsState/${uuidv4()}`,
  default: [],
});

export const thumbnailState = atom<Thumbnail>({
  key: `thumbnailState/${uuidv4()}`,
  default: null,
});

export const dropStatusState = atom<Boolean>({
  key: `dropStatusState/${uuidv4()}`,
  default: false,
});

export const dropInfoState = atom<DropInfo>({
  key: `dropInfoState/${uuidv4()}`,
  default: {
    account: '',
    accountOwner: '',
    minAmount: 0,
    bank: '',
  },
});

export const dropEndDateState = atom<Date>({
  key: `dropEndDateState/${uuidv4()}`,
  default: new Date(),
});

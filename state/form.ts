import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '@libs/client/types';

type Hashtag = string;

type Thumbnail = File | null;

type MinAmount = number;

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

export const dropState = atom<Boolean>({
  key: `dropState/${uuidv4()}`,
  default: false,
});

export const DropEndDateState = atom<Date>({
  key: `dropEndDateState/${uuidv4()}`,
  default: new Date(),
});

export const DropMinAmountState = atom<MinAmount>({
  key: `dropMinAmountState/${uuidv4()}`,
  default: 0,
});

import imageUpload from '@libs/client/imageUpload';
import { Question } from '@libs/client/types';
import { atom, selector } from 'recoil';

// TODO: Should make several form states: date, questions, hashtags...

type Hashtag = string;

type Thumbnail = File | null;

export const TodayState = atom<Date>({
  key: 'today',
  default: new Date(),
});

export const startDateState = atom<Date>({
  key: 'startDate',
  default: new Date(),
});

export const endDateState = atom<Date>({
  key: 'endDate',
  default: new Date(),
});

export const endDateSelector = selector<Date>({
  key: 'endDateChanger',
  get: ({ get }) => {
    return get(startDateState);
  },
  set: ({ set }, newValue) => {
    set(endDateState, newValue);
  },
});

export const hashtagsState = atom<Hashtag[]>({
  key: 'hashtagsState',
  default: [],
});

export const questionsState = atom<Question[]>({
  key: 'questionsState',
  default: [],
});

export const thumbnailState = atom<Thumbnail>({
  key: 'thumbnailState',
  default: null,
});

export const thumbnailURLState = selector<string>({
  key: 'thumbnailURLState',
  get: async ({ get }) => {
    const thumbnail = get(thumbnailState);
    return thumbnail ? await imageUpload(thumbnail) : 'no-thumbnail';
  },
});

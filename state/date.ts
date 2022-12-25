import { atom, selector } from 'recoil';

// TODO: Should make several form states: date, questions, hashtags...

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

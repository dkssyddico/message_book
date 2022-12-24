import { atom } from 'recoil';

// TODO: Should make several form states: date, questions, hashtags...

export const dateState = atom({
  key: 'dateState',
  default: {
    startDate: new Date(),
    endDate: new Date(),
  },
});

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

type SearchWord = string;

export const searchWordState = atom<SearchWord>({
  key: `searchWordState/${uuidv4()}`,
  default: '',
});

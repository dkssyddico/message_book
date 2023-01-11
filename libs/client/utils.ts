import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function formatAgo(date: Date, lang = 'ko') {
  return format(date, lang);
}

export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

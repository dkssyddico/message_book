import {
  Account,
  Answer,
  Book,
  BookFav,
  Comment,
  CommentLike,
  Drop,
  FanArt,
  Hashtag,
  Question,
  Reply,
  ReplyLike,
  User,
} from '@prisma/client';

export interface ReplyWithLikes extends Reply {
  likes: ReplyLike[];
  _count: {
    likes: number;
  };
}

export interface CommentWithReply extends Comment {
  replies: ReplyWithLikes[];
  likes: CommentLike[];
  _count: {
    replies: number;
    likes: number;
  };
}

export interface BookWithDetails extends Book {
  hashtags: Hashtag[];
  comments: CommentWithReply[];
  questions: Question[];
  drop: Drop;
  favs: BookFav[];
  _count: {
    answers: number;
  };
}

export interface BookDetailResponse {
  success: boolean;
  book: BookWithDetails;
}

export interface BookWithFavs extends Book {
  favs: BookFav[];
}

export interface BookResponse {
  success: boolean;
  books: BookWithFavs[];
}

export interface FanArtWithBook extends FanArt {
  book: Book;
}

export interface AnswerWithQuestionBooks extends Answer {
  question: Question;
  book: Book;
}

interface UserInfoWithAccounts extends User {
  accounts: Account[];
  books: BookWithFavs[];
  answers: AnswerWithQuestionBooks[];
  fanArts: FanArtWithBook[];
}

export interface MyResponse {
  success: boolean;
  user: UserInfoWithAccounts;
}

export interface UploadAnswerMutation {
  success: boolean;
}

export interface AnswerWithQuestion extends Answer {
  question: Question;
}

export interface AnswersResponse {
  success: boolean;
  answers: AnswerWithQuestion[];
}

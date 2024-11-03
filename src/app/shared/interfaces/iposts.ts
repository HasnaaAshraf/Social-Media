
export interface Iposts {
  _id: string;
  body?: string;
  image?: string;
  user: User;
  createdAt: string;
  comments: (Comment | Comments2)[];
  id: string;
}

interface Comments2 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  content?: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  photo: string;
}
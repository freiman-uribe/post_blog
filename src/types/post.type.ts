//Post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  commentsPost: Comment[];
  currentPost: Post | null;
  loading: LoadingState;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

// Usuarios
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}



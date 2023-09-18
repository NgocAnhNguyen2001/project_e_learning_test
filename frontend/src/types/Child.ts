import { User } from "./Auth";

export interface Child {
  id: string;
  username: string;
  birthDate: Date;
  loginPattern: string;
  bio?: string;
  email?: string;
  user: User;
}

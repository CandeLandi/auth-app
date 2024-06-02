import { User } from './user.interface';

export interface RegisterPayload {
  user: User;
  token: string;
}

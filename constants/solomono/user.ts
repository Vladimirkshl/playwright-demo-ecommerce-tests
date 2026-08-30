import { IPhone } from '@constants/solomono/contact';

export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: IPhone;
  api?: {
    api: string;
  };
}

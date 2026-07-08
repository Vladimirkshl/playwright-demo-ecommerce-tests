import { IDateFormatted } from '@constants/common';
import { IPhone } from '../contact';

export interface IAccount {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: IDateFormatted;
  phoneNumber: IPhone;
}

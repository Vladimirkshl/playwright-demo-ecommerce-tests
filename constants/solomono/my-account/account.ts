import { IDateFormatted } from '@constants/common';
import { IPhone } from '../contact';

export interface IAccount {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: IDateFormatted;
  phoneNumber: IPhone;
}

// HACK: User account is harcoded data due to limitations on demo website
export const ACCOUNT: IAccount = {
  email: process.env.SOLOMONO_AUTH_EMAIL,
  firstName: 'Volod',
  lastName: 'Testd',
  dateOfBirth: { formattedDateOfBirth: '02/02/2020' },
  phoneNumber: { 
    code: '+380',
    number: '000000000',
    numberWithCodeFormatted: '+380000000000',
  },
};

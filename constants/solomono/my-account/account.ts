import { IDateTime } from '@constants/common';
import { TimeZone } from '@constants/geo/geo';
import { IUser } from '@constants/solomono/user';

export interface IAccount extends IUser {
  email: string;
  dateOfBirth?: IDateTime;
}

// HACK: User account is harcoded data due to limitations on demo website
export const ACCOUNT: IAccount = {
  email: process.env.SOLOMONO_AUTH_EMAIL,
  firstName: 'Volod',
  lastName: 'Testd',
  dateOfBirth: {
    date: new Date('2020-02-02T00:00:00.000Z'),
    dateFormatted: '02/02/2020',
    formattedDateOfBirth: '02/02/2020',
    day: '2',
    month: '02',
    monthName: 'February',
    year: '2020',
    time: '00:00',
    timeZone: TimeZone.MST,
    fullDateTime: '02/02/2020 00:00 MST',
  },
  phoneNumber: { 
    code: '+380',
    number: '000000000',
    numberWithCodeFormatted: '+380000000000',
  },
};

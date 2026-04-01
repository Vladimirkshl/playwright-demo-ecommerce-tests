import { DateFormat } from '@constants/common';
import { formatInTimeZone } from 'date-fns-tz';

export class Utils {

  /* TEXT */

  static addIndexToXpath = (xpath: string, index: number): string => {
    const indexStr = index === -1 ? 'last()' : index.toString();
    return `(${xpath})[${indexStr}]`;
  };

  /* DATE */

  static formateDate = (
    date: Date | string,
    timezone = 'Etc/UTC',
    dateFormat = DateFormat.yyyyMMdd_HHmmss
  ) => formatInTimeZone(date, timezone, dateFormat);
  
  static getCurrentDateTime = () => this.formateDate(new Date());

}

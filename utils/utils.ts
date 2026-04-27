import { DateFormat } from '@constants/common';
import { formatInTimeZone } from 'date-fns-tz';

export class Utils {

  /* TEXT */

  static jsonStringify = (obj: object, spacing = 2): string => JSON.stringify(obj, null, spacing);

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

  /* COLLECTIONS */

  static mergeObjects = (object: object, rest: object) => {
    return {
      ...object,
      ...rest,
    };
  };

  static async pause(seconds = 1) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

}

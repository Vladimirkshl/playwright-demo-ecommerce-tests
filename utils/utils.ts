import _ from 'lodash';

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

  static getRandomMember = <T>(list: T[], exclude?: T | T[]): T => {
    let pool = exclude ? this.cloneDeep(list) : list;

    if (exclude) {
      this.toArray(exclude).forEach((excludeMember) => {
        pool = this.removeMemberAll(pool, excludeMember);
      });
    }
    return pool[Math.floor(Math.random() * pool.length)];
  };

  static mergeObjects = (object: object, rest: object) => {
    return {
      ...object,
      ...rest,
    };
  };

  static removeMemberAll = <T>(list: T[], memberToRemove: T): T[] => {
    let i = 0;
    while (i < list.length) {
      if (list[i] === memberToRemove) list.splice(i, 1);
      else ++i;
    }
    return list;
  };

  static cloneDeep = <T>(value: T): T => _.cloneDeep(value);

  static async pause(seconds = 1) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  };

  static getRandomValue = <T extends object>(obj: T): T[keyof T] => {
    return this.getRandomMember(this.getValues(obj));
  };

  static getValues = <T extends object>(
    obj: T,
    exclude?: T[keyof T] | T[keyof T][]
  ): T[keyof T][] => {
    let values = (Object.keys(obj) as (keyof T)[]).map((key) => obj[key]);
    if (exclude) {
      const excludeSet = new Set(this.toArray(exclude));
      values = values.filter((value) => !excludeSet.has(value));
    }
    return values;
  };

  static toArray = <T>(valueOrArray: T | T[]): T[] => {
    if (Array.isArray(valueOrArray)) return valueOrArray;

    return [valueOrArray];
  };
 
}

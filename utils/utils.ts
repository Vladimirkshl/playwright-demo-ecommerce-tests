export class Utils {

  /* TEXT */

  static addIndexToXpath = (xpath: string, index: number): string => {
    const indexStr = index === -1 ? 'last()' : index.toString();
    return `(${xpath})[${indexStr}]`;
  };

}

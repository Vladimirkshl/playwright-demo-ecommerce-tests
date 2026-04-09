import path from 'path';
import fs from 'fs';

import { Report } from '@utils/report';
import { IProduct } from '@constants/solomono/product';
import { MenuItem } from '@constants/solomono/menu';
import { IItem } from '@constants/solomono/item';

const TEMP_PATH = `./TEMP_${process.env.ENV}`;

export type TAllItems = IItem | IProduct;

export const TEMP_ENTITY_PATH = {
  LAPTOP: `${TEMP_PATH}/${MenuItem.LAPTOPS}.json`,
};

export class FileSystemUtils {
  static resolvePath(filePath: string): string {
    return path.resolve(process.cwd(), filePath);
  }

  static doesPathExist(path: string): boolean {
    return fs.existsSync(path);
  }

  static doesEntityPathExist(path: string): boolean {
    const fullPath = this.resolvePath(path);
    if(!this.doesPathExist(fullPath)) return false;
    
    try {
      const fileContent = this.readFile(fullPath) as string;
      const items: TAllItems[] = JSON.parse(fileContent);
      return Array.isArray(items) && items.length > 0;
    } catch (error) {
      Report.attachJson(`Error checking entity path ${path}:`, { error });
      return false;
    }
  }

  static readFile(filePath: string, encoding: BufferEncoding | null = 'utf-8'): string | Buffer {
    return fs.readFileSync(
      this.resolvePath(filePath),
      encoding === null ? undefined : { encoding }
    );
  }  
}

import fs from 'fs';

export class FileSystemUtils {
  static doesPathExist(path: string): boolean {
    return fs.existsSync(path);
  }
}

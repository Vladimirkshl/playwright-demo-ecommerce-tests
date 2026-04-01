import fs from 'fs';
import path from 'path';

export class FileSystemUtils {
  static resolvePath(filePath: string): string {
    return path.resolve(process.cwd(), filePath);
  }

  static doesPathExist(path: string): boolean {
    return fs.existsSync(path);
  }

  static readFile(filePath: string, encoding: BufferEncoding | null = 'utf-8'): string | Buffer {
    return fs.readFileSync(
      this.resolvePath(filePath),
      encoding === null ? undefined : { encoding }
    );
  }  
}

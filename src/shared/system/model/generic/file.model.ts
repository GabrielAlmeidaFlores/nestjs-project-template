import { FileSystemStoredFile } from 'nestjs-form-data';

export class FileModel extends FileSystemStoredFile {
  protected readonly _type = FileModel.name;
}

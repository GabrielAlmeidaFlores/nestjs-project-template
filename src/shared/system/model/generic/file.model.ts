import { MemoryStoredFile } from 'nestjs-form-data';

export class FileModel extends MemoryStoredFile {
  protected readonly _type = FileModel.name;
}

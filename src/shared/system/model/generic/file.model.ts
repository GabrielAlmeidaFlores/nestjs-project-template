import { MemoryStoredFile } from 'nestjs-form-data';

export class FileModel extends MemoryStoredFile {
  protected readonly _type = FileModel.name;

  public static build(props: {
    buffer: Buffer;
    originalName: string;
    size: number;
    encoding: string;
  }): FileModel {
    const fileModel = new FileModel();
    fileModel.buffer = props.buffer;
    fileModel.originalName = props.originalName;
    fileModel.size = props.size;
    fileModel.encoding = props.encoding;
    return fileModel;
  }
}

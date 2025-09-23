export abstract class ImageProcessorGateway {
  public abstract coverCropCenter(
    input: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer>;

  public abstract convertToDefaultMimeType(input: Buffer): Promise<Buffer>;
}

import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';

@Injectable()
export class SharpService implements ImageProcessorGateway {
  protected readonly _type = SharpService.name;

  private readonly defaultFormat:
    | 'jpeg'
    | 'png'
    | 'webp'
    | 'avif'
    | 'tiff'
    | 'gif' = 'webp';
  private readonly defaultQuality = 85;

  public async convertToDefaultMimeType(input: Buffer): Promise<Buffer> {
    return await sharp(input)
      .toFormat(this.defaultFormat, { quality: this.defaultQuality })
      .toBuffer();
  }

  public async coverCropCenter(
    input: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(input)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
      })
      .toFormat(this.defaultFormat, { quality: this.defaultQuality })
      .toBuffer();
  }
}

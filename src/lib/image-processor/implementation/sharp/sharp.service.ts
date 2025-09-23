import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';

type OutputFormatType = 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff' | 'gif';

@Injectable()
export class SharpService implements ImageProcessorGateway {
  protected readonly _type = SharpService.name;

  private readonly defaultFormat: OutputFormatType = 'webp';
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

import { Injectable } from '@nestjs/common';
import { Jimp, JimpMime } from 'jimp';

import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';

@Injectable()
export class JimpService implements ImageProcessorGateway {
  protected readonly _type = JimpService.name;

  private readonly defaultMimeType = JimpMime.jpeg;

  public async convertToDefaultMimeType(input: Buffer): Promise<Buffer> {
    const img = await Jimp.read(input);
    return await img.getBuffer(this.defaultMimeType);
  }

  public async coverCropCenter(
    input: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    const img = await Jimp.read(input);

    const scale = Math.max(width / img.width, height / img.height);
    img.scale(scale);

    const HALF = 2;
    const x = Math.max(0, Math.floor((img.width - width) / HALF));
    const y = Math.max(0, Math.floor((img.height - height) / HALF));

    img.crop({ x, y, w: width, h: height });

    return await img.getBuffer(this.defaultMimeType);
  }
}

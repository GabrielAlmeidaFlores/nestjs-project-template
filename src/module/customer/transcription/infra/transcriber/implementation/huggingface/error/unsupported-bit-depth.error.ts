import { UnexpectedError } from '@core/error/unexpected.error';

export class UnsupportedBitDepthError extends UnexpectedError {
  protected override readonly _type = UnsupportedBitDepthError.name;

  public constructor(props: { bitDepth: number }) {
    super(`Profundidade de bits não suportada: ${props.bitDepth}`);
  }
}

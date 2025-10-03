import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidWavFormatError extends UnexpectedError {
  protected override readonly _type = InvalidWavFormatError.name;

  public constructor() {
    super('Não foi possível ler o formato do arquivo WAV.');
  }
}

import type { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';

export abstract class TranscriberGateway {
  public abstract transcribe(
    audioBuffer: Buffer,
    language: TranscribeFromLanguageEnum,
  ): Promise<string>;
}

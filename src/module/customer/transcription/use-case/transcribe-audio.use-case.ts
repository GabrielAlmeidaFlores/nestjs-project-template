import { Inject, Injectable } from '@nestjs/common';

import { TranscribeAudioRequestDto } from '@module/customer/transcription/dto/request/transcribe-audio.request.dto';
import { TranscribeAudioResponseDto } from '@module/customer/transcription/dto/response/transcribe-audio.response.dto';
import { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';
import { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';

@Injectable()
export class TranscribeAudioUseCase {
  protected readonly _type = TranscribeAudioUseCase.name;

  public constructor(
    @Inject(TranscriberGateway)
    private readonly transcriberGateway: TranscriberGateway,
  ) {}

  public async execute(
    dto: TranscribeAudioRequestDto,
  ): Promise<TranscribeAudioResponseDto> {
    const transcribeAudio = await this.transcriberGateway.transcribe(
      dto.audio.buffer,
      dto.language as unknown as TranscribeFromLanguageEnum,
    );

    return TranscribeAudioResponseDto.build({
      transcription: transcribeAudio,
    });
  }
}

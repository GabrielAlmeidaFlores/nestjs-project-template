import { Readable, PassThrough } from 'stream';

import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { Inject, Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';

import { TranscribeAudioRequestDto } from '@module/customer/transcription/dto/request/transcribe-audio.request.dto';
import { TranscribeAudioResponseDto } from '@module/customer/transcription/dto/response/transcribe-audio.response.dto';
import { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';
import { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';

ffmpeg.setFfmpegPath(ffmpegPath.path);

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
    let audioBuffer = dto.audio.buffer;

    // Se for WAV, converter para MP3
    const isWavFile = dto.audio.mimeType?.includes('wav');
    if (isWavFile) {
      audioBuffer = await this.convertWavToMp3(audioBuffer);
    }

    const transcribeAudio = await this.transcriberGateway.transcribe(
      audioBuffer,
      dto.json.language as unknown as TranscribeFromLanguageEnum,
    );

    return TranscribeAudioResponseDto.build({
      transcription: transcribeAudio,
    });
  }

  private async convertWavToMp3(wavBuffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      const readableStream = Readable.from(wavBuffer);
      const passThrough = new PassThrough();

      const command = ffmpeg(readableStream)
        .format('mp3')
        .audioCodec('libmp3lame')
        .audioBitrate('192k')
        .on('error', (err) => reject(err));

      command.pipe(passThrough, { end: true });

      passThrough.on('data', (chunk: Buffer) => chunks.push(chunk));
      passThrough.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}

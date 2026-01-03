import { Readable, PassThrough } from 'stream';

import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { pipeline } from '@huggingface/transformers';
import ffmpeg from 'fluent-ffmpeg';
import { Reader } from 'wav';

import { InvalidWavFormatError } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/error/invalid-wav-format.error';
import { UnsupportedBitDepthError } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/error/unsupported-bit-depth.error';

import type { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';
import type { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';
import type { Format } from 'wav';

ffmpeg.setFfmpegPath(ffmpegPath.path);

export class HuggingFaceService implements TranscriberGateway {
  protected readonly _type = HuggingFaceService.name;

  private readonly bitsInByte = 8;
  private readonly wavAudioFormatFloat = 3;
  private readonly whisperSampleRate = 16000;

  private readonly bitDepth = {
    eight: 8,
    sixteen: 16,
    thirtyTwo: 32,
  } as const;

  private readonly pcm16BitNormalization = 32768.0;
  private readonly pcm8BitOffset = 128;
  private readonly pcm8BitNormalization = 128.0;

  public async transcribe(
    audioBuffer: Buffer,
    language: TranscribeFromLanguageEnum,
  ): Promise<string> {
    const wavBuffer = await this.decodeAnyAudioToWavBuffer(audioBuffer);

    const audio = await this.decodeAudioBufferToFloat32(wavBuffer);

    const asr = await pipeline(
      'automatic-speech-recognition',
      'Xenova/whisper-base',
    );

    const result = await asr(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: false,
      task: 'transcribe',
      language,
    });

    if (!Array.isArray(result)) {
      return result.text;
    }

    return result.map((part) => part.text).join(' ');
  }

  private async decodeAnyAudioToWavBuffer(
    inputBuffer: Buffer,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      const readableStream = Readable.from(inputBuffer);
      const passThrough = new PassThrough();

      const command = ffmpeg(readableStream)
        .format('wav')
        .audioCodec('pcm_s16le')
        .audioFrequency(this.whisperSampleRate)
        .audioChannels(1)
        .on('error', (err) => reject(err));

      command.pipe(passThrough, { end: true });

      passThrough.on('data', (chunk: Buffer) => chunks.push(chunk));
      passThrough.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  private async decodeAudioBufferToFloat32(
    audioBuffer: Buffer,
  ): Promise<Float32Array> {
    return new Promise((resolve, reject) => {
      const reader = new Reader();
      const chunks: Buffer[] = [];

      let format: Format | null = null;

      reader.on('format', (f) => {
        format = f;
      });

      reader.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      reader.on('error', (err: Error) => {
        reject(err);
      });

      reader.on('end', () => {
        if (!format) {
          return reject(new InvalidWavFormatError());
        }

        const data = Buffer.concat(chunks);
        const bytesPerSample = format.bitDepth / this.bitsInByte;

        const numSamples = data.length / bytesPerSample;

        const samples = new Float32Array(numSamples / format.channels);

        let sampleIndex = 0;

        for (
          let i = 0;
          i < data.length;
          i += bytesPerSample * format.channels
        ) {
          let channelSum = 0;

          for (let c = 0; c < format.channels; c++) {
            const offset = i + c * bytesPerSample;
            let value = 0;

            if (format.bitDepth === this.bitDepth.sixteen) {
              value = data.readInt16LE(offset) / this.pcm16BitNormalization;
            } else if (
              format.bitDepth === this.bitDepth.thirtyTwo &&
              format.audioFormat === this.wavAudioFormatFloat
            ) {
              value = data.readFloatLE(offset);
            } else if (format.bitDepth === this.bitDepth.eight) {
              value =
                (data.readUInt8(offset) - this.pcm8BitOffset) /
                this.pcm8BitNormalization;
            } else {
              return reject(
                new UnsupportedBitDepthError({ bitDepth: format.bitDepth }),
              );
            }

            channelSum += value;
          }

          samples[sampleIndex++] = channelSum / format.channels;
        }

        resolve(samples);
      });

      reader.end(audioBuffer);
    });
  }
}

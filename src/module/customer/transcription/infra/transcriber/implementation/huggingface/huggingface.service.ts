import { pipeline } from '@huggingface/transformers';
import { Reader } from 'wav';

import { UnsupportedBitDepthError } from '@module/customer/transcription/infra/transcriber/implementation/huggingface/error/unsupported-bit-depth.error';

import type { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';
import type { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';
import type { Format } from 'wav';

export class HuggingFaceService implements TranscriberGateway {
  protected readonly _type = HuggingFaceService.name;

  private readonly bitsInByte = 8;
  private readonly wavAudioFormatFloat = 3;

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
    const audio = await this.decodeAudioBufferToFloat32(audioBuffer);

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

    const resultIsNotArray = !Array.isArray(result);
    if (resultIsNotArray) {
      return result.text;
    }

    return result
      .map((resultPart) => {
        return resultPart.text;
      })
      .join(' ');
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
          return reject(
            new Error('Não foi possível ler o formato do arquivo WAV.'),
          );
        }

        const data = Buffer.concat(chunks);
        const numSamples = data.length / (format.bitDepth / this.bitsInByte);
        const samples = new Float32Array(numSamples / format.channels);

        let sampleIndex = 0;
        const bytesPerSample = format.bitDepth / this.bitsInByte;

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

import { Test } from '@nestjs/testing';

import {
  TranscribeAudioJsonRequestDto,
  TranscribeAudioRequestDto,
} from '@module/customer/transcription/dto/request/transcribe-audio.request.dto';
import { TranscribeAudioResponseDto } from '@module/customer/transcription/dto/response/transcribe-audio.response.dto';
import { TranscriptionLanguageEnum } from '@module/customer/transcription/enum/transcription-language.enum';
import { TranscriberGateway } from '@module/customer/transcription/infra/transcriber/transcriber.gateway';
import { TranscribeAudioUseCase } from '@module/customer/transcription/use-case/transcribe-audio.use-case';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { TranscribeFromLanguageEnum } from '@module/customer/transcription/infra/transcriber/enum/transcribe-from-language.enum';

describe(TranscribeAudioUseCase.name, () => {
  let useCase: TranscribeAudioUseCase;

  const transcriberGateway: jest.Mocked<TranscriberGateway> = {
    transcribe: jest.fn(),
  } as unknown as jest.Mocked<TranscriberGateway>;

  const makeDto = (): TranscribeAudioRequestDto => {
    const audioFile = new FileModel();
    audioFile.buffer = Buffer.from('fake-audio-buffer');
    audioFile.size = 12345;
    audioFile.encoding = '7bit';

    const json = TranscribeAudioJsonRequestDto.build({
      language: TranscriptionLanguageEnum.PORTUGUESE,
    });

    return TranscribeAudioRequestDto.build({
      audio: audioFile,
      json,
    });
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TranscribeAudioUseCase,
        {
          provide: TranscriberGateway,
          useValue: transcriberGateway,
        },
      ],
    }).compile();

    useCase = module.get(TranscribeAudioUseCase);

    jest.clearAllMocks();
  });

  it('should transcribe audio successfully and return the transcription text', async () => {
    const dto = makeDto();
    const expectedTranscription = 'This is a test transcription.';

    transcriberGateway.transcribe.mockResolvedValueOnce(expectedTranscription);

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(TranscribeAudioResponseDto);
    expect(result.transcription).toBe(expectedTranscription);

    expect(transcriberGateway.transcribe).toHaveBeenCalledTimes(1);

    const [[capturedBuffer, capturedLanguage]] = transcriberGateway.transcribe
      .mock.calls as [[Buffer, TranscribeFromLanguageEnum]];

    expect(capturedBuffer).toBe(dto.audio.buffer);
    expect(capturedLanguage).toBe(dto.json.language);
  });

  it('throws an error when the transcriber gateway fails', async () => {
    const dto = makeDto();
    const mockError = new Error('Transcription service failed');

    transcriberGateway.transcribe.mockRejectedValueOnce(mockError);

    await expect(useCase.execute(dto)).rejects.toThrow(mockError);

    expect(transcriberGateway.transcribe).toHaveBeenCalledTimes(1);
    const [[capturedBuffer, capturedLanguage]] = transcriberGateway.transcribe
      .mock.calls as [[Buffer, TranscribeFromLanguageEnum]];
    expect(capturedBuffer).toBe(dto.audio.buffer);
    expect(capturedLanguage).toBe(dto.json.language);
  });
});

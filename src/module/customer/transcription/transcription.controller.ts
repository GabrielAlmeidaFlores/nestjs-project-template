type FileLike = { buffer: Buffer };
import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { GeminiService } from '@infra/generative-ia/implementation/geminini/gemini.service';
import { TesteRequestDto } from '@module/customer/transcription/dto/request/teste.request.dto';
import { TranscribeAudioRequestDto } from '@module/customer/transcription/dto/request/transcribe-audio.request.dto';
import { TesteResponseDto } from '@module/customer/transcription/dto/response/teste.response.dto';
import { TranscribeAudioResponseDto } from '@module/customer/transcription/dto/response/transcribe-audio.response.dto';
import { TranscribeAudioUseCase } from '@module/customer/transcription/use-case/transcribe-audio.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@CustomerControllerRoute('audio')
export class TranscriptionController {
  protected readonly _type = TranscriptionController.name;

  public constructor(
    private readonly transcribeAudioUseCase: TranscribeAudioUseCase,
    private readonly geminiService: GeminiService,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Transcribe audio',
    http: {
      path: 'transcription',
      method: RequestMethod.POST,
      type: TranscribeAudioRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Audio was transcribed successfully',
      type: TranscribeAudioResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
    throttle: {
      limit: 50,
      ttlInMinutes: 5,
    },
  })
  public async customerSignUp(
    @Body() dto: TranscribeAudioRequestDto,
  ): Promise<TranscribeAudioResponseDto> {
    return await this.transcribeAudioUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Teste Gemini',
    http: {
      path: 'teste',
      method: RequestMethod.POST,
      type: TesteRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Teste',
      type: TesteResponseDto,
    },
  })
  public async teste(@Body() dto: TesteRequestDto): Promise<any> {
    const buffers = Array.isArray(dto.cnisDocument)
      ? (dto.cnisDocument as FileLike[]).map((file) => file.buffer)
      : [(dto.cnisDocument as FileLike).buffer];

    const resposta = await this.geminiService.analysisFastCnis(buffers);
    return { answer: resposta };
  }
}

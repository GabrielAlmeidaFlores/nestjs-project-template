import { RequestMethod, HttpStatus, Body } from '@nestjs/common';

import { TranscribeAudioRequestDto } from '@module/customer/transcription/dto/request/transcribe-audio.request.dto';
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
  ) {}

  @BuildEndpointSpecification({
    summary: 'Transcrever áudio',
    http: {
      path: 'transcription',
      method: RequestMethod.POST,
      type: TranscribeAudioRequestDto,
    },
    tag: ['transcricao-de-audio'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Áudio transcrito com sucesso.',
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
}

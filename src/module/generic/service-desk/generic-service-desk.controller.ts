import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';

import { RegisterSupportAttendantRequestDto } from '@module/generic/service-desk/dto/request/register-support-attendant.request.dto';
import { ValidateSupportAttendantInviteRequestDto } from '@module/generic/service-desk/dto/request/validate-support-attendant-invite.request.dto';
import { RegisterSupportAttendantResponseDto } from '@module/generic/service-desk/dto/response/register-support-attendant.response.dto';
import { ValidateSupportAttendantInviteResponseDto } from '@module/generic/service-desk/dto/response/validate-support-attendant-invite.response.dto';
import { RegisterSupportAttendantUseCase } from '@module/generic/service-desk/use-case/register-support-attendant.use-case';
import { ValidateSupportAttendantInviteUseCase } from '@module/generic/service-desk/use-case/validate-support-attendant-invite.use-case';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

import type { FastifyReply } from 'fastify';

@GenericControllerRoute('service-desk')
export class GenericServiceDeskController {
  protected readonly _type = GenericServiceDeskController.name;

  public constructor(
    private readonly registerSupportAttendantUseCase: RegisterSupportAttendantUseCase,
    private readonly validateSupportAttendantInviteUseCase: ValidateSupportAttendantInviteUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Ativar acesso de atendente de suporte via convite',
    http: {
      path: 'register',
      method: RequestMethod.POST,
      type: RegisterSupportAttendantRequestDto,
    },
    tag: ['service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Atendente de suporte ativado e autenticado com sucesso.',
      type: RegisterSupportAttendantResponseDto,
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 5,
    },
  })
  public async register(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() dto: RegisterSupportAttendantRequestDto,
  ): Promise<RegisterSupportAttendantResponseDto> {
    return this.registerSupportAttendantUseCase.execute(reply, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Validar convite de atendente de suporte',
    http: {
      path: 'validate-invite',
      method: RequestMethod.POST,
      type: ValidateSupportAttendantInviteRequestDto,
    },
    tag: ['service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do convite obtidos com sucesso.',
      type: ValidateSupportAttendantInviteResponseDto,
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 5,
    },
  })
  public async validateInvite(
    @Body() dto: ValidateSupportAttendantInviteRequestDto,
  ): Promise<ValidateSupportAttendantInviteResponseDto> {
    return this.validateSupportAttendantInviteUseCase.execute(dto);
  }
}

import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { CreateSupportAttendantRequestDto } from '@module/admin/support-attendant/dto/request/create-support-attendant.request.dto';
import { CreateSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/create-support-attendant.response.dto';
import { CreateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/create-support-attendant.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('support-attendant')
export class SupportAttendantController {
  protected readonly _type = SupportAttendantController.name;

  public constructor(
    private readonly createSupportAttendantUseCase: CreateSupportAttendantUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSupportAttendantRequestDto,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Atendente de suporte criado com sucesso. Um e-mail com as credenciais de acesso é enviado.',
      type: CreateSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createSupportAttendant(
    @Body() dto: CreateSupportAttendantRequestDto,
  ): Promise<CreateSupportAttendantResponseDto> {
    return this.createSupportAttendantUseCase.execute(dto);
  }
}

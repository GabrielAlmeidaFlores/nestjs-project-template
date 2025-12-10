import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { LegalProceedingCronUseCase } from '@module/customer/legal-proceeding/use-case/legal-proceeding-cron.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('legal-proceeding')
export class LegalProceedingController {
  protected readonly _type = LegalProceedingController.name;

  public constructor(
    private readonly legalProceedingCronUseCase: LegalProceedingCronUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar status do processo na plataforma',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'sync',
      method: RequestMethod.POST,
    },
    tag: ['detalhes-do-processo-judicial'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Lista de clientes da análise retornada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async manualSyn(@Body() dto: ListDataRequestDto): Promise<void> {
    return await this.legalProceedingCronUseCase.execute(dto);
  }
}

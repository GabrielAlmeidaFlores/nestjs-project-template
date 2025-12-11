import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail.request.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { ListLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
@CustomerControllerRoute('legal-proceeding')
export class LegalProceedingController {
  protected readonly _type = LegalProceedingController.name;

  public constructor(
    private readonly listLegalProceedingDetailUseCase: ListLegalProceedingDetailUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros detalhados sobre os processos judiciais',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'list-proceeding-detail',
      method: RequestMethod.GET,
    },
    tag: ['registro-processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Listar registros detalhados sobre os processos judiciais',
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.listLegalProceedingDetailUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}

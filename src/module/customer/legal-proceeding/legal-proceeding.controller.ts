import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListLegalProceedingDetailByLegalProceedingNumberRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-legal-proceeding-number.request.dto';
import { ListLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail.request.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { ListLegalProceedingDetailByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail-by-legal-proceeding-number.use-case';
import { ListLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
@CustomerControllerRoute('legal-proceeding')
export class LegalProceedingController {
  protected readonly _type = LegalProceedingController.name;

  public constructor(
    private readonly listLegalProceedingDetailUseCase: ListLegalProceedingDetailUseCase,
    private readonly getAnalysisToolClientLegalProceedingUseCaseGateway: GetAnalysisToolClientLegalProceedingUseCaseGateway,
    private readonly listLegalProceedingDetailByLegalProceedingNumberUseCase: ListLegalProceedingDetailByLegalProceedingNumberUseCase,
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

  @BuildEndpointSpecification({
    summary: 'Listar registros pela organizacao',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'organization',
      method: RequestMethod.GET,
    },
    tag: ['registro-processos-juridicos-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Listar registros detalhados sobre os processos judiciais da organizacao',
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByOrganization(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto> {
    return this.getAnalysisToolClientLegalProceedingUseCaseGateway.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar registros numero do processo judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'numero-processo-judicial',
      method: RequestMethod.GET,
    },
    tag: ['registro-numero-processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Listar registros detalhados sobre os processos judiciais conforme o numero do processo',
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByLegalProceedingNumber(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.listLegalProceedingDetailByLegalProceedingNumberUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }
}

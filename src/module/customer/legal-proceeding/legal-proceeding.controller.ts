import { HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding-created-range.request.dto';
import { GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding.-by-legal-proceeding-number.request.dto';
import { ListLegalProceedingItemActionResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-client-detail-action.response.dto';
import { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import { GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding-action-by-legal-proceeding-number.use-case-gateway';
import { GetAnalysisToolClientLegalProceedingActionUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding-action.use-case-gateway';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListLegalProceedingDetailByAnalysisToolClientRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-analysis-tool-client-id.request.dto';
import { ListLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail.request.dto';
import { CountLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/count-legal-proceeding-detail.reponse.dto';
import { GetLegalProceedingDetailLawyerWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-lawyer-with-relations.response.dto';
import { ListLegalProceedingDetailLawyerResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail-lawyer.response.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { CountLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/count-legal-proceeding-detail.use-case';
import { GetLegalProceedingDetailByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/get-legal-proceeding-detail-by-legal-proceeding-number.use-case';
import { ListLegalProceedingDetailByAnalysisToolClientIdUseCase } from '@module/customer/legal-proceeding/use-case/list-legal-proceeding-detail-by-analysis-tool-client-id.use-case';
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
    private readonly getLegalProceedingDetailByLegalProceedingNumberUseCase: GetLegalProceedingDetailByLegalProceedingNumberUseCase,
    private readonly countLegalProceedingDetailUseCase: CountLegalProceedingDetailUseCase,
    private readonly listLegalProceedingDetailByAnalysisToolClientIdUseCase: ListLegalProceedingDetailByAnalysisToolClientIdUseCase,
    private readonly getAnalysisToolClientLegalProceedingActionUseCaseGateway: GetAnalysisToolClientLegalProceedingActionUseCaseGateway,
    private readonly getAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCaseGateway: GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCaseGateway,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros detalhados sobre os processos judiciais',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'list-proceeding-detail',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Listar registros detalhados sobre os processos judiciais',
      type: ListLegalProceedingDetailLawyerResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailRequestDto,
  ): Promise<ListLegalProceedingDetailLawyerResponseDto> {
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
    tag: ['processos-juridicos'],
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
    @Query() dto: GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto> {
    return this.getAnalysisToolClientLegalProceedingUseCaseGateway.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar movimentações processuais pela organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'action/organization',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Listar registros detalhados sobre as movimentações processos judiciais da organização',
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalProceedingDetailActionByOrganization(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto> {
    return this.getAnalysisToolClientLegalProceedingActionUseCaseGateway.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar movimentações processuais pelo numero do processo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'action/legal-proceeding-number',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Listar registro detalhado sobre as movimentações de um processo judicial',
      type: ListLegalProceedingItemActionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalProceedingDetailActionByLegalProceedingNumber(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query()
    dto: GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingItemActionResponseDto> {
    return this.getAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCaseGateway.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar registros numero do processo judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-proceeding-number',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Listar registros detalhados sobre os processos judiciais conforme o numero do processo',
      type: GetLegalProceedingDetailLawyerWithRelationsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByLegalProceedingNumber(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalProceedingNumber')
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailLawyerWithRelationsResponseDto> {
    return this.getLegalProceedingDetailByLegalProceedingNumberUseCase.execute(
      organizationSessionData,
      sessionData,
      legalProceedingNumber,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Contagem dos processos judiciais pertencentes ao advogado logado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'count-proceeding-detail',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Listar registros detalhados sobre os processos judiciais',
      type: CountLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async countLegalProceedingDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CountLegalProceedingDetailResponseDto> {
    return this.countLegalProceedingDetailUseCase.execute(
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar processos judiciais pelo ID do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Listar processos judiciais pelo ID do cliente',
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByAnalysisToolClientId(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailByAnalysisToolClientRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.listLegalProceedingDetailByAnalysisToolClientIdUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}

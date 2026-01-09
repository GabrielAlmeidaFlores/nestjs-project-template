import { HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding-created-range.request.dto';
import { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListLegalProceedingDetailByAnalysisToolClientRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-analysis-tool-client-id.request.dto';
import { ListLegalProceedingDetailByDateRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-date.request.dto';
import { ListLegalProceedingDetailByLegalProceedingNumberRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-legal-proceeding-number.request.dto';
import { ListLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail.request.dto';
import { CountLegalProceedingDetailStatusResponseDto } from '@module/customer/legal-proceeding/dto/response/count-legal-proceeding-detail-status.reponse.dto';
import { GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-with-lawyer-and-recipient-relations.response.dto';
import { ListLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail-with-lawyer-and-recipient-relations.response';
import { ListLegalProceedingDetailWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail-with-relations.response.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { CountLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/count-legal-proceeding-detail.use-case';
import { GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/get-analysis-tool-client-legal-proceeding-actions-by-legal-proceeding-number.use-case';
import { GetAnalysisToolClientLegalProceedingActionUseCase } from '@module/customer/legal-proceeding/use-case/get-analysis-tool-client-legal-proceeding-actions.use-case';
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
    private readonly getAnalysisToolClientLegalProceedingActionUseCase: GetAnalysisToolClientLegalProceedingActionUseCase,
    private readonly getAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase: GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase,
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
      type: ListLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailRequestDto,
  ): Promise<ListLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto> {
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
      type: ListLegalProceedingDetailWithRelationsResponseDto,
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
      type: ListLegalProceedingDetailWithRelationsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalProceedingDetailActionByOrganization(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailByDateRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.getAnalysisToolClientLegalProceedingActionUseCase.execute(
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
      type: ListLegalProceedingDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalProceedingDetailActionByLegalProceedingNumber(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query()
    dto: ListLegalProceedingDetailByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.getAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase.execute(
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
      type: GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByLegalProceedingNumber(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalProceedingNumber')
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto> {
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
      type: CountLegalProceedingDetailStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async countLegalProceedingDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CountLegalProceedingDetailStatusResponseDto> {
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
      type: ListLegalProceedingDetailWithRelationsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalProceedingDetailByAnalysisToolClientId(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailByAnalysisToolClientRequestDto,
  ): Promise<ListLegalProceedingDetailWithRelationsResponseDto> {
    return this.listLegalProceedingDetailByAnalysisToolClientIdUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}

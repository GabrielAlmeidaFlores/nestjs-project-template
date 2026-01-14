import { HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding-created-range.request.dto';
import { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import { GetAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/get-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListLegalProceedingDetailByDateRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-date.request.dto';
import { CountLegalProceedingDetailStatusResponseDto } from '@module/customer/legal-proceeding/dto/response/count-legal-proceeding-detail-status.reponse.dto';
import { GetLegalProceedingDetailWithLawyerAndRecipientRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-with-lawyer-and-recipient-relations.response.dto';
import { ListLegalProceedingDetailWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail-with-relations.response.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { CountLegalProceedingDetailUseCase } from '@module/customer/legal-proceeding/use-case/count-legal-proceeding-detail.use-case';
import { GetLegalProceedingDetailByLegalProceedingNumberUseCase } from '@module/customer/legal-proceeding/use-case/get-legal-proceeding-detail-by-legal-proceeding-number.use-case';
import { ListAnalysisToolClientLegalProceedingActionUseCase } from '@module/customer/legal-proceeding/use-case/list-analysis-tool-client-legal-proceeding-actions.use-case';
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
    private readonly getAnalysisToolClientLegalProceedingUseCaseGateway: GetAnalysisToolClientLegalProceedingUseCaseGateway,
    private readonly getLegalProceedingDetailByLegalProceedingNumberUseCase: GetLegalProceedingDetailByLegalProceedingNumberUseCase,
    private readonly countLegalProceedingDetailUseCase: CountLegalProceedingDetailUseCase,
    private readonly listAnalysisToolClientLegalProceedingActionUseCase: ListAnalysisToolClientLegalProceedingActionUseCase,
  ) {}

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
  public async listLegalProceedingDetailActionByOrganization(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailByDateRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    return this.listAnalysisToolClientLegalProceedingActionUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Buscar registros numero do processo judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':legalProceedingNumber',
      method: RequestMethod.GET,
    },
    tag: ['processos-juridicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Registro detalhado sobre o processo judicial conforme o numero do processo',
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
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CountLegalProceedingDetailStatusResponseDto> {
    return this.countLegalProceedingDetailUseCase.execute(
      organizationSessionData,
    );
  }
}

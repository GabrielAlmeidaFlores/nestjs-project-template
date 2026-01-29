import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import { AddRuralTimelineAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-period-document.request.dto';
import { CreateRuralTimelineAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis.request.dto';
import { AddRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-period-document.response.dto';
import { CreateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis.response.dto';
import { DeleteRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/delete-rural-timeline-analysis-period-document.response.dto';
import { GetRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-analysis.response.dto';
import { AddRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-period-document.use-case';
import { CreateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis.use-case';
import { DeleteRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-document.use-case';
import { GetRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-analysis.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool/rural-timeline-analysis')
export class RuralTimelineAnalysisController {
  protected readonly _type = RuralTimelineAnalysisController.name;

  public constructor(
    private readonly createRuralTimelineAnalysisUseCase: CreateRuralTimelineAnalysisUseCase,
    private readonly getRuralTimelineAnalysisUseCase: GetRuralTimelineAnalysisUseCase,
    private readonly addRuralTimelineAnalysisPeriodDocumentUseCase: AddRuralTimelineAnalysisPeriodDocumentUseCase,
    private readonly deleteRuralTimelineAnalysisPeriodDocumentUseCase: DeleteRuralTimelineAnalysisPeriodDocumentUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRuralTimelineAnalysisRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de linha do tempo rural criada com sucesso.',
      type: CreateRuralTimelineAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRuralTimelineAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRuralTimelineAnalysisRequestDto,
  ): Promise<CreateRuralTimelineAnalysisResponseDto> {
    return await this.createRuralTimelineAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes da análise de linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Detalhes da análise de linha do tempo rural obtidos com sucesso.',
      type: GetRuralTimelineAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRuralTimelineAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisResponseDto> {
    return await this.getRuralTimelineAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar documento a um período rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/document',
      method: RequestMethod.POST,
      type: AddRuralTimelineAnalysisPeriodDocumentRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documento adicionado ao período rural com sucesso.',
      type: AddRuralTimelineAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async addRuralTimelineAnalysisPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodId),
    )
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
    @Body() dto: AddRuralTimelineAnalysisPeriodDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisPeriodDocumentResponseDto> {
    return await this.addRuralTimelineAnalysisPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar documento de um período rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/document/:ruralTimelineAnalysisPeriodDocumentId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento deletado do período rural com sucesso.',
      type: DeleteRuralTimelineAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteRuralTimelineAnalysisPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodDocumentId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodDocumentId),
    )
    ruralTimelineAnalysisPeriodDocumentId: RuralTimelineAnalysisPeriodDocumentId,
  ): Promise<DeleteRuralTimelineAnalysisPeriodDocumentResponseDto> {
    return await this.deleteRuralTimelineAnalysisPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodDocumentId,
    );
  }
}

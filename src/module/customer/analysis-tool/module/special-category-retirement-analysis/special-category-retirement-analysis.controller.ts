import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/add-special-category-retirement-analysis-period-document.request.dto';
import { CreateSpecialCategoryRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis.request.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period.request.dto';
import { GetSpecialCategoryRetirementAnalysisTimelineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/get-special-category-retirement-analysis-timeline.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-remuneration.request.dto';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/update-special-category-retirement-analysis-work-period.request.dto';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/add-special-category-retirement-analysis-period-document.response.dto';
import { CreateSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis.response.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-work-period.response.dto';
import { DeleteSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis.response.dto';
import { DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-period-document.response.dto';
import { DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-remuneration.response.dto';
import { DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis-work-period.response.dto';
import { GenerateSpecialCategoryRetirementAnalysisConversionResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/generate-special-category-retirement-analysis-conversion.response.dto';
import { GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/generate-special-category-retirement-analysis-full-text.response.dto';
import { GenerateSpecialCategoryRetirementAnalysisRulesResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/generate-special-category-retirement-analysis-rules.response.dto';
import { GetSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/get-special-category-retirement-analysis.response.dto';
import { GetSpecialCategoryRetirementAnalysisTimelineResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/get-special-category-retirement-analysis-timeline.response.dto';
import { ListSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/list-special-category-retirement-analysis-remuneration.response.dto';
import { UpdateSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis.response.dto';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-remuneration.response.dto';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/update-special-category-retirement-analysis-work-period.response.dto';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/add-special-category-retirement-analysis-period-document.use-case';
import { CreateSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis.use-case';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-work-period.use-case';
import { DeleteSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis.use-case';
import { DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-period-document.use-case';
import { DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-remuneration.use-case';
import { DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/delete-special-category-retirement-analysis-work-period.use-case';
import { DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/download-special-category-retirement-analysis-full-document.use-case';
import { DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/download-special-category-retirement-analysis-simplified-document.use-case';
import { GenerateSpecialCategoryRetirementAnalysisConversionUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-conversion.use-case';
import { GenerateSpecialCategoryRetirementAnalysisFullTextUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-full-text.use-case';
import { GenerateSpecialCategoryRetirementAnalysisRulesUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-rules.use-case';
import { GetSpecialCategoryRetirementAnalysisByIdUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/get-special-category-retirement-analysis-by-id.use-case';
import { GetSpecialCategoryRetirementAnalysisTimelineUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/get-special-category-retirement-analysis-timeline.use-case';
import { ListSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/list-special-category-retirement-analysis-remuneration.use-case';
import { UpdateSpecialCategoryRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis.use-case';
import { UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-remuneration.use-case';
import { UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/update-special-category-retirement-analysis-work-period.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool/special-category-retirement-analysis')
export class SpecialCategoryRetirementAnalysisController {
  protected readonly _type = SpecialCategoryRetirementAnalysisController.name;

  public constructor(
    private readonly createUseCase: CreateSpecialCategoryRetirementAnalysisUseCase,
    private readonly getByIdUseCase: GetSpecialCategoryRetirementAnalysisByIdUseCase,
    private readonly updateUseCase: UpdateSpecialCategoryRetirementAnalysisUseCase,
    private readonly deleteUseCase: DeleteSpecialCategoryRetirementAnalysisUseCase,
    private readonly createWorkPeriodUseCase: CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    private readonly updateWorkPeriodUseCase: UpdateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    private readonly deleteWorkPeriodUseCase: DeleteSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
    private readonly addPeriodDocumentUseCase: AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    private readonly deletePeriodDocumentUseCase: DeleteSpecialCategoryRetirementAnalysisPeriodDocumentUseCase,
    private readonly getTimelineUseCase: GetSpecialCategoryRetirementAnalysisTimelineUseCase,
    private readonly listRemunerationUseCase: ListSpecialCategoryRetirementAnalysisRemunerationUseCase,
    private readonly updateRemunerationUseCase: UpdateSpecialCategoryRetirementAnalysisRemunerationUseCase,
    private readonly deleteRemunerationUseCase: DeleteSpecialCategoryRetirementAnalysisRemunerationUseCase,
    private readonly generateFullTextUseCase: GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
    private readonly generateConversionUseCase: GenerateSpecialCategoryRetirementAnalysisConversionUseCase,
    private readonly generateRulesUseCase: GenerateSpecialCategoryRetirementAnalysisRulesUseCase,
    private readonly downloadFullDocumentUseCase: DownloadSpecialCategoryRetirementAnalysisFullDocumentUseCase,
    private readonly downloadSimplifiedDocumentUseCase: DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de aposentadoria por categoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpecialCategoryRetirementAnalysisRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateSpecialCategoryRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createSpecialCategoryRetirementAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialCategoryRetirementAnalysisRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisResponseDto> {
    return await this.createUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de aposentadoria por categoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetSpecialCategoryRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getSpecialCategoryRetirementAnalysisById(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResponseDto> {
    return await this.getByIdUseCase.execute(organizationSessionData, id);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de aposentadoria por categoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateSpecialCategoryRetirementAnalysisRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateSpecialCategoryRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateSpecialCategoryRetirementAnalysis(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
    @Body() dto: UpdateSpecialCategoryRetirementAnalysisRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisResponseDto> {
    return await this.updateUseCase.execute(organizationSessionData, id, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Deletar análise de aposentadoria por categoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.DELETE,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise deletada com sucesso.',
      type: DeleteSpecialCategoryRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deleteSpecialCategoryRetirementAnalysis(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisResponseDto> {
    return await this.deleteUseCase.execute(organizationSessionData, id);
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'work-period',
      method: RequestMethod.POST,
      type: CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período de trabalho criado com sucesso.',
      type: CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createWorkPeriod(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    return await this.createWorkPeriodUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'work-period/:workPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho atualizado com sucesso.',
      type: UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateWorkPeriod(
    @Param(
      'workPeriodId',
      new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisWorkPeriodId),
    )
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
    @Body() dto: UpdateSpecialCategoryRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    return await this.updateWorkPeriodUseCase.execute(
      workPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover período de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'work-period/:workPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho removido com sucesso.',
      type: DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deleteWorkPeriod(
    @Param(
      'workPeriodId',
      new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisWorkPeriodId),
    )
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisWorkPeriodResponseDto> {
    return await this.deleteWorkPeriodUseCase.execute(
      workPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar documento a um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period-document',
      method: RequestMethod.POST,
      type: AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documento adicionado com sucesso.',
      type: AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard],
  })
  public async addPeriodDocument(
    @Body() dto: AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto,
  ): Promise<AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto> {
    return await this.addPeriodDocumentUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover documento de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period-document/:periodDocumentId',
      method: RequestMethod.DELETE,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento removido com sucesso.',
      type: DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deletePeriodDocument(
    @Param(
      'periodDocumentId',
      new ParseValueObjectPipe(
        SpecialCategoryRetirementAnalysisPeriodDocumentId,
      ),
    )
    periodDocumentId: SpecialCategoryRetirementAnalysisPeriodDocumentId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto> {
    return await this.deletePeriodDocumentUseCase.execute(periodDocumentId);
  }

  @BuildEndpointSpecification({
    summary: 'Obter linha do tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/timeline',
      method: RequestMethod.GET,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Linha do tempo obtida com sucesso.',
      type: GetSpecialCategoryRetirementAnalysisTimelineResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getTimeline(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
    @Query() filters: GetSpecialCategoryRetirementAnalysisTimelineRequestDto,
  ): Promise<GetSpecialCategoryRetirementAnalysisTimelineResponseDto> {
    return await this.getTimelineUseCase.execute(
      organizationSessionData,
      id,
      filters,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar remunerações da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/remuneration',
      method: RequestMethod.GET,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações listadas com sucesso.',
      type: ListSpecialCategoryRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listRemuneration(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<ListSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    return await this.listRemunerationUseCase.execute(
      organizationSessionData,
      id,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar remuneração',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'remuneration/:remunerationId',
      method: RequestMethod.PATCH,
      type: UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remuneração atualizada com sucesso.',
      type: UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateRemuneration(
    @Param(
      'remunerationId',
      new ParseValueObjectPipe(
        SpecialCategoryRetirementAnalysisRemunerationId,
      ),
    )
    remunerationId: SpecialCategoryRetirementAnalysisRemunerationId,
    @Body() dto: UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto,
  ): Promise<UpdateSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    return await this.updateRemunerationUseCase.execute(remunerationId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Resetar remuneração',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'remuneration/:remunerationId',
      method: RequestMethod.DELETE,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remuneração resetada com sucesso.',
      type: DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deleteRemuneration(
    @Param(
      'remunerationId',
      new ParseValueObjectPipe(
        SpecialCategoryRetirementAnalysisRemunerationId,
      ),
    )
    remunerationId: SpecialCategoryRetirementAnalysisRemunerationId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    return await this.deleteRemunerationUseCase.execute(remunerationId);
  }

  @BuildEndpointSpecification({
    summary: 'Gerar texto completo da análise via IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/generate-full-text',
      method: RequestMethod.POST,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Texto gerado com sucesso.',
      type: GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto,
    },
    guard: [AuthGuard],
  })
  public async generateFullText(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<GenerateSpecialCategoryRetirementAnalysisFullTextResponseDto> {
    return await this.generateFullTextUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar itens de conversão da análise via IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/generate-conversion',
      method: RequestMethod.POST,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Itens de conversão gerados com sucesso.',
      type: GenerateSpecialCategoryRetirementAnalysisConversionResponseDto,
    },
    guard: [AuthGuard],
  })
  public async generateConversion(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<GenerateSpecialCategoryRetirementAnalysisConversionResponseDto> {
    return await this.generateConversionUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar itens de regras da análise via IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/generate-rules',
      method: RequestMethod.POST,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Itens de regras gerados com sucesso.',
      type: GenerateSpecialCategoryRetirementAnalysisRulesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async generateRules(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<GenerateSpecialCategoryRetirementAnalysisRulesResponseDto> {
    return await this.generateRulesUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download do documento completo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/full-document',
      method: RequestMethod.GET,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento gerado com sucesso.',
      type: Object,
    },
    guard: [AuthGuard],
  })
  public async downloadFullDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
    @Query('format') format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadFullDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download do documento simplificado da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/simplified-document',
      method: RequestMethod.GET,
    },
    tag: ['categoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento simplificado gerado com sucesso.',
      type: Object,
    },
    guard: [AuthGuard],
  })
  public async downloadSimplifiedDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(SpecialCategoryRetirementAnalysisId))
    id: SpecialCategoryRetirementAnalysisId,
    @Query('format') format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadSimplifiedDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
      format,
    );
  }
}

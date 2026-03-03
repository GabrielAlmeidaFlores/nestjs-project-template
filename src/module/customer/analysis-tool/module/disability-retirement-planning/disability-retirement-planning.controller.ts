import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { CreateDisabilityRetirementPlanningPeriodsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning-periods.request.dto';
import { CreateDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning-remuneration.request.dto';
import { CreateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning.request.dto';
import { ListDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/list-disability-retirement-planning-remuneration.request.dto';
import { UpdateDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning-remuneration.request.dto';
import { UpdateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning.request.dto';
import { CreateDisabilityRetirementPlanningPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-periods.response.dto';
import { CreateDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-remuneration.response.dto';
import { CreateDisabilityRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-result.response.dto';
import { CreateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning.response.dto';
import { DeleteDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/delete-disability-retirement-planning.response.dto';
import { GetDisabilityRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning-remuneration-calculation.response.dto';
import { GetDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning.response.dto';
import { ListDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/list-disability-retirement-planning-remuneration.response.dto';
import { UpdateDisabilityRetirementPlanningPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning-periods.response.dto';
import { UpdateDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning-remuneration.response.dto';
import { UpdateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning.response.dto';
import { CreateDisabilityRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-period.use-case';
import { CreateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-remuneration.use-case';
import { CreateDisabilityRetirementPlanningResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-result.use-case';
import { CreateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning.use-case';
import { DeleteDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/delete-disability-retirement-planning.use-case';
import { DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/download-disability-retirement-planning-complete-analysis.use-case';
import { DownloadDisabilityRetirementPlanningSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/download-disability-retirement-planning-simplified-analysis.use-case';
import { GetDisabilityRetirementPlanningRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/get-disability-retirement-planning-remuneration-calculation.use-case';
import { GetDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/get-disability-retirement-planning.use-case';
import { ListDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/list-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning-period.use-case';
import { UpdateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning.use-case';
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

@CustomerControllerRoute('analysis-tool/disability-retirement-planning')
export class DisabilityRetirementPlanningController {
  protected readonly _type = DisabilityRetirementPlanningController.name;

  public constructor(
    private readonly createDisabilityRetirementPlanningUseCase: CreateDisabilityRetirementPlanningUseCase,
    private readonly createDisabilityRetirementPlanningPeriodUseCase: CreateDisabilityRetirementPlanningPeriodUseCase,
    private readonly updateDisabilityRetirementPlanningPeriodUseCase: UpdateDisabilityRetirementPlanningPeriodUseCase,
    private readonly createDisabilityRetirementPlanningRemunerationUseCase: CreateDisabilityRetirementPlanningRemunerationUseCase,
    private readonly updateDisabilityRetirementPlanningRemunerationUseCase: UpdateDisabilityRetirementPlanningRemunerationUseCase,
    private readonly getDisabilityRetirementPlanningUseCase: GetDisabilityRetirementPlanningUseCase,
    private readonly listDisabilityRetirementPlanningRemunerationUseCase: ListDisabilityRetirementPlanningRemunerationUseCase,
    private readonly updateDisabilityRetirementPlanningUseCase: UpdateDisabilityRetirementPlanningUseCase,
    private readonly createDisabilityRetirementPlanningResultUseCase: CreateDisabilityRetirementPlanningResultUseCase,
    private readonly deleteDisabilityRetirementPlanningUseCase: DeleteDisabilityRetirementPlanningUseCase,
    private readonly getDisabilityRetirementPlanningRemunerationCalculationUseCase: GetDisabilityRetirementPlanningRemunerationCalculationUseCase,
    private readonly downloadDisabilityRetirementPlanningCompleteAnalysisUseCase: DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase,
    private readonly downloadDisabilityRetirementPlanningSimplifiedAnalysisUseCase: DownloadDisabilityRetirementPlanningSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningRequestDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Planejamento de aposentadoria da pessoa com deficiência criado com sucesso.',
      type: CreateDisabilityRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDisabilityRetirementPlanningRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningResponseDto> {
    return await this.createDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar períodos do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/period',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningPeriodsRequestDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos criados com sucesso.',
      type: CreateDisabilityRetirementPlanningPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanningPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: CreateDisabilityRetirementPlanningPeriodsRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningPeriodsResponseDto> {
    return await this.createDisabilityRetirementPlanningPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar períodos do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/period',
      method: RequestMethod.PATCH,
      type: CreateDisabilityRetirementPlanningPeriodsRequestDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateDisabilityRetirementPlanningPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityRetirementPlanningPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: CreateDisabilityRetirementPlanningPeriodsRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningPeriodsResponseDto> {
    return await this.updateDisabilityRetirementPlanningPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar remunerações do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: CreateDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.createDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar remunerações do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: UpdateDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.updateDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter planejamento de aposentadoria da pessoa com deficiência por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do planejamento de aposentadoria da pessoa com deficiência retornados com sucesso.',
      type: GetDisabilityRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningResponseDto> {
    return await this.getDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar remunerações do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: ':disabilityRetirementPlanningId/remuneration',
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Remunerações do planejamento de aposentadoria da pessoa com deficiência listadas com sucesso.',
      type: ListDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Query() dto: ListDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.listDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.PATCH,
      path: ':disabilityRetirementPlanningId',
      type: UpdateDisabilityRetirementPlanningRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria da pessoa com deficiência atualizado com sucesso.',
      type: UpdateDisabilityRetirementPlanningResponseDto,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: UpdateDisabilityRetirementPlanningRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningResponseDto> {
    return await this.updateDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: ':disabilityRetirementPlanningId/result',
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do planejamento de aposentadoria por invalidez criado com sucesso.',
      type: CreateDisabilityRetirementPlanningResultResponseDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanningResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<CreateDisabilityRetirementPlanningResultResponseDto> {
    return await this.createDisabilityRetirementPlanningResultUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.DELETE,
      path: ':disabilityRetirementPlanningId',
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria por invalidez excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningResponseDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<DeleteDisabilityRetirementPlanningResponseDto> {
    return await this.deleteDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter cálculo de remunerações do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration-calculation',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cálculo de remunerações retornado com sucesso.',
      type: GetDisabilityRetirementPlanningRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDisabilityRetirementPlanningRemunerationCalculation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningRemunerationCalculationResponseDto> {
    return this.getDisabilityRetirementPlanningRemunerationCalculationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadDisabilityRetirementPlanningCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadDisabilityRetirementPlanningCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada do planejamento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadDisabilityRetirementPlanningSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadDisabilityRetirementPlanningSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      format,
    );
  }
}

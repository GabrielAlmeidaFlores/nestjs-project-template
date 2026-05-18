import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common/pipes';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-insured-status.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-period.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-work-periods.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant-insured-status.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant-period.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant-work-periods.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-first-analysis.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-insured-status.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-period.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantResultResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-result.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant-work-periods.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant.response.dto';
import { GetTemporaryDisabilityBenefitsGrantResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/get-temporary-disability-benefits-grant.response.dto';
import { UpdateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant-insured-status.response.dto';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant-period.response.dto';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant-work-periods.response.dto';
import { UpdateTemporaryDisabilityBenefitsGrantResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant.response.dto';
import { CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-first-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-insured-status.use-case';
import { CreateTemporaryDisabilityBenefitsGrantPeriodUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-period.use-case';
import { CreateTemporaryDisabilityBenefitsGrantResultUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-result.use-case';
import { CreateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant-work-periods.use-case';
import { CreateTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/create-temporary-disability-benefits-grant.use-case';
import { DownloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/download-temporary-disability-benefits-grant-complete-analysis.use-case';
import { DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/download-temporary-disability-benefits-grant-simplified-analysis.use-case';
import { GetTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/get-temporary-disability-benefits-grant.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-insured-status.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-period.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant-work-periods.use-case';
import { UpdateTemporaryDisabilityBenefitsGrantUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/use-case/update-temporary-disability-benefits-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/temporary-disability-benefits-grant')
export class TemporaryDisabilityBenefitsGrantController {
  protected readonly _type = TemporaryDisabilityBenefitsGrantController.name;

  public constructor(
    private readonly createTemporaryDisabilityBenefitsGrantUseCase: CreateTemporaryDisabilityBenefitsGrantUseCase,
    private readonly getTemporaryDisabilityBenefitsGrantUseCase: GetTemporaryDisabilityBenefitsGrantUseCase,
    private readonly updateTemporaryDisabilityBenefitsGrantUseCase: UpdateTemporaryDisabilityBenefitsGrantUseCase,
    private readonly createTemporaryDisabilityBenefitsGrantPeriodUseCase: CreateTemporaryDisabilityBenefitsGrantPeriodUseCase,
    private readonly updateTemporaryDisabilityBenefitsGrantPeriodUseCase: UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase,
    private readonly createTemporaryDisabilityBenefitsGrantInsuredStatusUseCase: CreateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase,
    private readonly updateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase: UpdateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase,
    private readonly createTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase: CreateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase,
    private readonly updateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase: UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase,
    private readonly createTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase: CreateTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase,
    private readonly createTemporaryDisabilityBenefitsGrantResultUseCase: CreateTemporaryDisabilityBenefitsGrantResultUseCase,
    private readonly downloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase: DownloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase,
    private readonly downloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase: DownloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsGrantRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTemporaryDisabilityBenefitsGrantRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetTemporaryDisabilityBenefitsGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): Promise<GetTemporaryDisabilityBenefitsGrantResponseDto> {
    return await this.getTemporaryDisabilityBenefitsGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsGrantRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: UpdateTemporaryDisabilityBenefitsGrantRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar períodos à análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/period',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsGrantPeriodRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos criados com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: CreateTemporaryDisabilityBenefitsGrantPeriodRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantPeriodResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar período da análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/period',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período atualizado com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar situação do segurado à análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/insured-status',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Situação do segurado criada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: CreateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar situação do segurado da análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/insured-status',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Situação do segurado atualizada com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: UpdateTemporaryDisabilityBenefitsGrantInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantInsuredStatusResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsGrantInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar vínculos empregatícios à análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/work-periods',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Vínculos empregatícios criados com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: CreateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar vínculo empregatício da análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/work-periods',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Vínculo empregatício atualizado com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Body() dto: UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar pré-análise da auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantFirstAnalysisResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/result',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateTemporaryDisabilityBenefitsGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantResultResponseDto> {
    return await this.createTemporaryDisabilityBenefitsGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de auxílio de incapacidade temporária retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadTemporaryDisabilityBenefitsGrantCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada da auxílio de incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':temporaryDisabilityBenefitsGrantId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-de-incapacidade-temporaria'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de auxílio de incapacidade temporária retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsGrantId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsGrantId),
    )
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadTemporaryDisabilityBenefitsGrantSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsGrantId,
      format,
    );
  }
}

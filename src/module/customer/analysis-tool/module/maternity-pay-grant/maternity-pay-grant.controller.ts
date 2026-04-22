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
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { CreateMaternityPayGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/create-maternity-pay-grant-period.request.dto';
import { CreateMaternityPayGrantRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/create-maternity-pay-grant.request.dto';
import { ResolveMaternityPayGrantPeriodPendencyRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/resolve-maternity-pay-grant-period-pendency.request.dto';
import { UpdateMaternityPayGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/update-maternity-pay-grant-period.request.dto';
import { UpdateMaternityPayGrantRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/update-maternity-pay-grant.request.dto';
import { UploadMaternityPayGrantDocumentsRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/upload-maternity-pay-grant-documents.request.dto';
import { ValidateTriggeringEventDateRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/validate-triggering-event-date.request.dto';
import { CreateMaternityPayGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant-first-analysis.response.dto';
import { CreateMaternityPayGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant-period.response.dto';
import { CreateMaternityPayGrantResultResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant-result.response.dto';
import { CreateMaternityPayGrantResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/create-maternity-pay-grant.response.dto';
import { DeleteMaternityPayGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/delete-maternity-pay-grant-period.response.dto';
import { GetMaternityPayGrantResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/get-maternity-pay-grant.response.dto';
import { UpdateMaternityPayGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/update-maternity-pay-grant-period.response.dto';
import { UpdateMaternityPayGrantResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/update-maternity-pay-grant.response.dto';
import { UploadMaternityPayGrantDocumentsResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/upload-maternity-pay-grant-documents.response.dto';
import { ValidateTriggeringEventDateResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/validate-triggering-event-date.response.dto';
import { CreateMaternityPayGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-first-analysis.use-case';
import { CreateMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-period.use-case';
import { CreateMaternityPayGrantResultUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant-result.use-case';
import { CreateMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/create-maternity-pay-grant.use-case';
import { DeleteMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/delete-maternity-pay-grant-period.use-case';
import { DownloadMaternityPayGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/download-maternity-pay-grant-complete-analysis.use-case';
import { DownloadMaternityPayGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/download-maternity-pay-grant-simplified-analysis.use-case';
import { GetMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/get-maternity-pay-grant.use-case';
import { ResolveMaternityPayGrantPeriodPendencyUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/resolve-maternity-pay-grant-period-pendency.use-case';
import { UpdateMaternityPayGrantPeriodUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/update-maternity-pay-grant-period.use-case';
import { UpdateMaternityPayGrantUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/update-maternity-pay-grant.use-case';
import { UploadMaternityPayGrantDocumentsUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/upload-maternity-pay-grant-documents.use-case';
import { ValidateTriggeringEventDateUseCase } from '@module/customer/analysis-tool/module/maternity-pay-grant/use-case/validate-triggering-event-date.use-case';
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

@CustomerControllerRoute('analysis-tool/maternity-pay-grant')
export class MaternityPayGrantController {
  protected readonly _type = MaternityPayGrantController.name;

  public constructor(
    private readonly createMaternityPayGrantUseCase: CreateMaternityPayGrantUseCase,
    private readonly getMaternityPayGrantUseCase: GetMaternityPayGrantUseCase,
    private readonly updateMaternityPayGrantUseCase: UpdateMaternityPayGrantUseCase,
    private readonly createMaternityPayGrantPeriodUseCase: CreateMaternityPayGrantPeriodUseCase,
    private readonly updateMaternityPayGrantPeriodUseCase: UpdateMaternityPayGrantPeriodUseCase,
    private readonly deleteMaternityPayGrantPeriodUseCase: DeleteMaternityPayGrantPeriodUseCase,
    private readonly createMaternityPayGrantFirstAnalysisUseCase: CreateMaternityPayGrantFirstAnalysisUseCase,
    private readonly createMaternityPayGrantResultUseCase: CreateMaternityPayGrantResultUseCase,
    private readonly downloadMaternityPayGrantCompleteAnalysisUseCase: DownloadMaternityPayGrantCompleteAnalysisUseCase,
    private readonly downloadMaternityPayGrantSimplifiedAnalysisUseCase: DownloadMaternityPayGrantSimplifiedAnalysisUseCase,
    private readonly validateTriggeringEventDateUseCase: ValidateTriggeringEventDateUseCase,
    private readonly uploadMaternityPayGrantDocumentsUseCase: UploadMaternityPayGrantDocumentsUseCase,
    private readonly resolveMaternityPayGrantPeriodPendencyUseCase: ResolveMaternityPayGrantPeriodPendencyUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Validar data do fator gerador',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'validate-triggering-event-date',
      method: RequestMethod.GET,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Validação realizada com sucesso.',
      type: ValidateTriggeringEventDateResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public validateTriggeringEventDate(
    @Query() dto: ValidateTriggeringEventDateRequestDto,
  ): ValidateTriggeringEventDateResponseDto {
    return this.validateTriggeringEventDateUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateMaternityPayGrantRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateMaternityPayGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateMaternityPayGrantRequestDto,
  ): Promise<CreateMaternityPayGrantResponseDto> {
    return await this.createMaternityPayGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':id', method: RequestMethod.GET },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetMaternityPayGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<GetMaternityPayGrantResponseDto> {
    return await this.getMaternityPayGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateMaternityPayGrantRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateMaternityPayGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Body() dto: UpdateMaternityPayGrantRequestDto,
  ): Promise<UpdateMaternityPayGrantResponseDto> {
    return await this.updateMaternityPayGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.POST,
      type: CreateMaternityPayGrantPeriodRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateMaternityPayGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Body() dto: CreateMaternityPayGrantPeriodRequestDto,
  ): Promise<CreateMaternityPayGrantPeriodResponseDto> {
    return await this.createMaternityPayGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: UpdateMaternityPayGrantPeriodRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateMaternityPayGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Body() dto: UpdateMaternityPayGrantPeriodRequestDto,
  ): Promise<UpdateMaternityPayGrantPeriodResponseDto> {
    return await this.updateMaternityPayGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período da análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':id/period/:periodId', method: RequestMethod.DELETE },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período excluído com sucesso.',
      type: DeleteMaternityPayGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Param('periodId', new ParseValueObjectPipe(MaternityPayGrantPeriodId))
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): Promise<DeleteMaternityPayGrantPeriodResponseDto> {
    return await this.deleteMaternityPayGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      maternityPayGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Executar primeira análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':id/first-analysis', method: RequestMethod.POST },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Primeira análise executada com sucesso.',
      type: CreateMaternityPayGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<CreateMaternityPayGrantFirstAnalysisResponseDto> {
    return await this.createMaternityPayGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado da análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':id/result', method: RequestMethod.POST },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateMaternityPayGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<CreateMaternityPayGrantResultResponseDto> {
    return await this.createMaternityPayGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download da análise completa de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':id/result/download-complete', method: RequestMethod.GET },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo de análise completa gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadMaternityPayGrantCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download da análise simplificada de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/download-simplified',
      method: RequestMethod.GET,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo de análise simplificada gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadMaternityPayGrantSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos da análise de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/documents',
      method: RequestMethod.PATCH,
      type: UploadMaternityPayGrantDocumentsRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos enviados com sucesso.',
      type: UploadMaternityPayGrantDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Body() dto: UploadMaternityPayGrantDocumentsRequestDto,
  ): Promise<UploadMaternityPayGrantDocumentsResponseDto> {
    return await this.uploadMaternityPayGrantDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      maternityPayGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Resolver pendência de um período de salário-maternidade',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period/:periodId/resolve-pendency',
      method: RequestMethod.POST,
      type: ResolveMaternityPayGrantPeriodPendencyRequestDto,
    },
    tag: ['salario-maternidade'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Pendência do período resolvida com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async resolvePeriodPendency(
    @Param('id', new ParseValueObjectPipe(MaternityPayGrantId))
    maternityPayGrantId: MaternityPayGrantId,
    @Param('periodId', new ParseValueObjectPipe(MaternityPayGrantPeriodId))
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    @Body() dto: ResolveMaternityPayGrantPeriodPendencyRequestDto,
  ): Promise<void> {
    await this.resolveMaternityPayGrantPeriodPendencyUseCase.execute(
      maternityPayGrantId,
      maternityPayGrantPeriodId,
      dto,
    );
  }
}

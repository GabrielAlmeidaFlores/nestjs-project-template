import {
  RequestMethod,
  HttpStatus,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { PeriodConsiderationActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { CreateAccidentAssistanceTerminatedEventRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated-event.request.dto';
import { CreateAccidentAssistanceTerminatedRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated.request.dto';
import { UpdateAccidentAssistanceTerminatedRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/update-accident-assistance-terminated.request.dto';
import { UploadAccidentAssistanceTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/upload-accident-assistance-terminated-documents.request.dto';
import { CreateAccidentAssistanceTerminatedDecisionDetailsResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-decision-details.response.dto';
import { CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-first-analysis.response.dto';
import { CreateAccidentAssistanceTerminatedPeriodRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated-period.request.dto';
import { CreateAccidentAssistanceTerminatedPeriodResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-period.response.dto';
import { CreateAccidentAssistanceTerminatedEventResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-event.response.dto';
import { CreateAccidentAssistanceTerminatedResultResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-result.response.dto';
import { CreateAccidentAssistanceTerminatedResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated.response.dto';
import { GetAccidentAssistanceTerminatedResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/get-accident-assistance-terminated.response.dto';
import { UpdateAccidentAssistanceTerminatedResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/update-accident-assistance-terminated.response.dto';
import { UploadAccidentAssistanceTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/upload-accident-assistance-terminated-documents.response.dto';
import { CreateAccidentAssistanceTerminatedDecisionDetailsUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-decision-details.use-case';
import { CreateAccidentAssistanceTerminatedFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-first-analysis.use-case';
import { CreateAccidentAssistanceTerminatedPeriodUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-period.use-case';
import { UpdateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/update-accident-assistance-terminated-period-consideration-action.use-case';
import { CreateAccidentAssistanceTerminatedEventUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-event.use-case';
import { CreateAccidentAssistanceTerminatedResultUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated-result.use-case';
import { CreateAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/create-accident-assistance-terminated.use-case';
import { DownloadAccidentAssistanceTerminatedCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/download-accident-assistance-terminated-complete-analysis.use-case';
import { DownloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/download-accident-assistance-terminated-simplified-analysis.use-case';
import { GetAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/get-accident-assistance-terminated.use-case';
import { UpdateAccidentAssistanceTerminatedUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/update-accident-assistance-terminated.use-case';
import { UploadAccidentAssistanceTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/accident-assistance-terminated/use-case/upload-accident-assistance-terminated-documents.use-case';
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

@CustomerControllerRoute('analysis-tool/accident-assistance-terminated')
export class AccidentAssistanceTerminatedController {
  protected readonly _type = AccidentAssistanceTerminatedController.name;

  public constructor(
    private readonly createAccidentAssistanceTerminatedUseCase: CreateAccidentAssistanceTerminatedUseCase,
    private readonly createAccidentAssistanceTerminatedResultUseCase: CreateAccidentAssistanceTerminatedResultUseCase,
    private readonly createAccidentAssistanceTerminatedDecisionDetailsUseCase: CreateAccidentAssistanceTerminatedDecisionDetailsUseCase,
    private readonly getAccidentAssistanceTerminatedUseCase: GetAccidentAssistanceTerminatedUseCase,
    private readonly downloadAccidentAssistanceTerminatedCompleteAnalysisUseCase: DownloadAccidentAssistanceTerminatedCompleteAnalysisUseCase,
    private readonly downloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase: DownloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase,
    private readonly updateAccidentAssistanceTerminatedUseCase: UpdateAccidentAssistanceTerminatedUseCase,
    private readonly uploadAccidentAssistanceTerminatedDocumentsUseCase: UploadAccidentAssistanceTerminatedDocumentsUseCase,
    private readonly createAccidentAssistanceTerminatedEventUseCase: CreateAccidentAssistanceTerminatedEventUseCase,
    private readonly createAccidentAssistanceTerminatedFirstAnalysisUseCase: CreateAccidentAssistanceTerminatedFirstAnalysisUseCase,
    private readonly createAccidentAssistanceTerminatedPeriodUseCase: CreateAccidentAssistanceTerminatedPeriodUseCase,
    private readonly updateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase: UpdateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAccidentAssistanceTerminatedRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Diagnóstico para auxílio-acidente (RGPS) criado com sucesso.',
      type: CreateAccidentAssistanceTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminated(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAccidentAssistanceTerminatedRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedResponseDto> {
    return await this.createAccidentAssistanceTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter diagnóstico para auxílio-acidente (RGPS) por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId',
      method: RequestMethod.GET,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do diagnóstico para auxílio-acidente (RGPS) retornados com sucesso.',
      type: GetAccidentAssistanceTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAccidentAssistanceTerminated(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<GetAccidentAssistanceTerminatedResponseDto> {
    return await this.getAccidentAssistanceTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId',
      method: RequestMethod.PATCH,
      type: UpdateAccidentAssistanceTerminatedRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Diagnóstico para auxílio-acidente (RGPS) atualizado com sucesso.',
      type: UpdateAccidentAssistanceTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAccidentAssistanceTerminated(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateAccidentAssistanceTerminatedRequestDto,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<UpdateAccidentAssistanceTerminatedResponseDto> {
    return await this.updateAccidentAssistanceTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/result',
      method: RequestMethod.POST,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do diagnóstico para auxílio-acidente (RGPS) criado com sucesso.',
      type: CreateAccidentAssistanceTerminatedResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminatedResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<CreateAccidentAssistanceTerminatedResultResponseDto> {
    return await this.createAccidentAssistanceTerminatedResultUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar detalhes da decisão do diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/decision-details',
      method: RequestMethod.POST,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Detalhes da decisão do diagnóstico para auxílio-acidente (RGPS) gerados com sucesso.',
      type: CreateAccidentAssistanceTerminatedDecisionDetailsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminatedDecisionDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<CreateAccidentAssistanceTerminatedDecisionDetailsResponseDto> {
    return await this.createAccidentAssistanceTerminatedDecisionDetailsUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada do diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do diagnóstico para auxílio-acidente (RGPS) retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAccidentAssistanceTerminatedSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAccidentAssistanceTerminatedSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa do diagnóstico para auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do diagnóstico para auxílio-acidente (RGPS) retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAccidentAssistanceTerminatedCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAccidentAssistanceTerminatedCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos do diagnóstico de auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/documents',
      method: RequestMethod.POST,
      type: UploadAccidentAssistanceTerminatedDocumentsRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadAccidentAssistanceTerminatedDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadAccidentAssistanceTerminatedDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Body() dto: UploadAccidentAssistanceTerminatedDocumentsRequestDto,
  ): Promise<UploadAccidentAssistanceTerminatedDocumentsResponseDto> {
    return await this.uploadAccidentAssistanceTerminatedDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Registrar evento gerador do auxílio-acidente (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/event',
      method: RequestMethod.POST,
      type: CreateAccidentAssistanceTerminatedEventRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Evento gerador registrado com sucesso.',
      type: CreateAccidentAssistanceTerminatedEventResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminatedEvent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Body() dto: CreateAccidentAssistanceTerminatedEventRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedEventResponseDto> {
    return await this.createAccidentAssistanceTerminatedEventUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Executar primeira análise do auxílio-acidente cessado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Primeira análise do auxílio-acidente cessado executada com sucesso.',
      type: CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminatedFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): Promise<CreateAccidentAssistanceTerminatedFirstAnalysisResponseDto> {
    return await this.createAccidentAssistanceTerminatedFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período manualmente para o auxílio-acidente cessado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/period',
      method: RequestMethod.POST,
      type: CreateAccidentAssistanceTerminatedPeriodRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateAccidentAssistanceTerminatedPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAccidentAssistanceTerminatedPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Body() dto: CreateAccidentAssistanceTerminatedPeriodRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedPeriodResponseDto> {
    return await this.createAccidentAssistanceTerminatedPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      accidentAssistanceTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Resolver pendência de período do auxílio-acidente cessado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':accidentAssistanceTerminatedId/period/:accidentAssistanceTerminatedPeriodId/consideration-action',
      method: RequestMethod.POST,
      type: PeriodConsiderationActionRequestDto,
    },
    tag: ['diagnostico-auxilio-acidente-rgps'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Ação de consideração do período executada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAccidentAssistanceTerminatedPeriodConsiderationAction(
    @GetSessionData() _sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    _organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'accidentAssistanceTerminatedId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedId),
    )
    _accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    @Param(
      'accidentAssistanceTerminatedPeriodId',
      new ParseValueObjectPipe(AccidentAssistanceTerminatedPeriodId),
    )
    accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId,
    @Body() dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    return await this.updateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase.execute(
      accidentAssistanceTerminatedPeriodId,
      dto,
    );
  }
}

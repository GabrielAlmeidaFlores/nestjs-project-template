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
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { CreateSpecialRetirementRejectionTechnicalDiagnosisRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/create-special-retirement-rejection-technical-diagnosis.request.dto';
import { CreateSpecialRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/create-special-retirement-rejection.request.dto';
import { UpdateSpecialRetirementRejectionTechnicalDiagnosisRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/update-special-retirement-rejection-technical-diagnosis.request.dto';
import { UpdateSpecialRetirementRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/update-special-retirement-rejection-work-periods.request.dto';
import { UpdateSpecialRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/update-special-retirement-rejection.request.dto';
import { CreateSpecialRetirementRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection-first-analysis.response.dto';
import { CreateSpecialRetirementRejectionResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection-result.response.dto';
import { CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection-technical-diagnosis.response.dto';
import { CreateSpecialRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection.response.dto';
import { GetSpecialRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/get-special-retirement-rejection.response.dto';
import { UpdateSpecialRetirementRejectionTechnicalDiagnosisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/update-special-retirement-rejection-technical-diagnosis.response.dto';
import { UpdateSpecialRetirementRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/update-special-retirement-rejection-work-periods.response.dto';
import { UpdateSpecialRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/update-special-retirement-rejection.response.dto';
import { CreateSpecialRetirementRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection-first-analysis.use-case';
import { CreateSpecialRetirementRejectionResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection-result.use-case';
import { CreateSpecialRetirementRejectionTechnicalDiagnosisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection-technical-diagnosis.use-case';
import { CreateSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/create-special-retirement-rejection.use-case';
import { DownloadSpecialRetirementRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/download-special-retirement-rejection-complete-analysis.use-case';
import { DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/download-special-retirement-rejection-simplified-analysis.use-case';
import { GetSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/get-special-retirement-rejection.use-case';
import { UpdateSpecialRetirementRejectionTechnicalDiagnosisUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/update-special-retirement-rejection-technical-diagnosis.use-case';
import { UpdateSpecialRetirementRejectionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/update-special-retirement-rejection-work-periods.use-case';
import { UpdateSpecialRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/special-retirement-rejection/use-case/update-special-retirement-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/special-retirement-rejection')
export class SpecialRetirementRejectionController {
  protected readonly _type = SpecialRetirementRejectionController.name;

  public constructor(
    private readonly createSpecialRetirementRejectionUseCase: CreateSpecialRetirementRejectionUseCase,
    private readonly getSpecialRetirementRejectionUseCase: GetSpecialRetirementRejectionUseCase,
    private readonly updateSpecialRetirementRejectionUseCase: UpdateSpecialRetirementRejectionUseCase,
    private readonly updateSpecialRetirementRejectionWorkPeriodsUseCase: UpdateSpecialRetirementRejectionWorkPeriodsUseCase,
    private readonly createSpecialRetirementRejectionFirstAnalysisUseCase: CreateSpecialRetirementRejectionFirstAnalysisUseCase,
    private readonly createSpecialRetirementRejectionResultUseCase: CreateSpecialRetirementRejectionResultUseCase,
    private readonly downloadSpecialRetirementRejectionCompleteAnalysisUseCase: DownloadSpecialRetirementRejectionCompleteAnalysisUseCase,
    private readonly downloadSpecialRetirementRejectionSimplifiedAnalysisUseCase: DownloadSpecialRetirementRejectionSimplifiedAnalysisUseCase,
    private readonly createSpecialRetirementRejectionTechnicalDiagnosisUseCase: CreateSpecialRetirementRejectionTechnicalDiagnosisUseCase,
    private readonly updateSpecialRetirementRejectionTechnicalDiagnosisUseCase: UpdateSpecialRetirementRejectionTechnicalDiagnosisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpecialRetirementRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Indeferimento de aposentadoria especial criado com sucesso.',
      type: CreateSpecialRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialRetirementRejection(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialRetirementRejectionRequestDto,
  ): Promise<CreateSpecialRetirementRejectionResponseDto> {
    return await this.createSpecialRetirementRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter indeferimento de aposentadoria especial por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do indeferimento de aposentadoria especial retornados com sucesso.',
      type: GetSpecialRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpecialRetirementRejection(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<GetSpecialRetirementRejectionResponseDto> {
    return await this.getSpecialRetirementRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Indeferimento de aposentadoria especial atualizado com sucesso.',
      type: UpdateSpecialRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpecialRetirementRejection(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Body() dto: UpdateSpecialRetirementRejectionRequestDto,
  ): Promise<UpdateSpecialRetirementRejectionResponseDto> {
    return await this.updateSpecialRetirementRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar períodos de trabalho do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/work-period',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementRejectionWorkPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Períodos de trabalho do indeferimento de aposentadoria especial atualizados com sucesso.',
      type: UpdateSpecialRetirementRejectionWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpecialRetirementRejectionWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Body() dto: UpdateSpecialRetirementRejectionWorkPeriodsRequestDto,
  ): Promise<UpdateSpecialRetirementRejectionWorkPeriodsResponseDto> {
    return await this.updateSpecialRetirementRejectionWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis criada com sucesso.',
      type: CreateSpecialRetirementRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<CreateSpecialRetirementRejectionFirstAnalysisResponseDto> {
    return await this.createSpecialRetirementRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do indeferimento de aposentadoria especial criado com sucesso.',
      type: CreateSpecialRetirementRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialRetirementRejectionResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<CreateSpecialRetirementRejectionResultResponseDto> {
    return await this.createSpecialRetirementRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialRetirementRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialRetirementRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar diagnóstico técnico do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/technical-diagnosis',
      method: RequestMethod.POST,
      type: CreateSpecialRetirementRejectionTechnicalDiagnosisRequestDto,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Diagnóstico técnico criado com sucesso.',
      type: CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTechnicalDiagnosis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Body() dto: CreateSpecialRetirementRejectionTechnicalDiagnosisRequestDto,
  ): Promise<CreateSpecialRetirementRejectionTechnicalDiagnosisResponseDto> {
    return await this.createSpecialRetirementRejectionTechnicalDiagnosisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar diagnóstico técnico do indeferimento de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementRejectionId/technical-diagnosis',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementRejectionTechnicalDiagnosisRequestDto,
    },
    tag: ['indeferimento-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Diagnóstico técnico atualizado com sucesso.',
      type: UpdateSpecialRetirementRejectionTechnicalDiagnosisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTechnicalDiagnosis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementRejectionId',
      new ParseValueObjectPipe(SpecialRetirementRejectionId),
    )
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    @Body() dto: UpdateSpecialRetirementRejectionTechnicalDiagnosisRequestDto,
  ): Promise<UpdateSpecialRetirementRejectionTechnicalDiagnosisResponseDto> {
    return await this.updateSpecialRetirementRejectionTechnicalDiagnosisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementRejectionId,
      dto,
    );
  }
}

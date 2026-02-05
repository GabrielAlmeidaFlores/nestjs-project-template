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
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { CreateMedicalQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/request/create-medical-question-generator.request.dto';
import { UpdateMedicalQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/request/update-medical-question-generator.request.dto';
import { CreateMedicalQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/create-medical-question-generator-result.response.dto';
import { CreateMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/create-medical-question-generator.response.dto';
import { GetMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/get-medical-question-generator.response.dto';
import { UpdateMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/update-medical-question-generator.response.dto';
import { CreateMedicalQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/create-medical-question-generator-result.use-case';
import { CreateMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/create-medical-question-generator.use-case';
import { DownloadMedicalQuestionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/download-medical-question-generator-complete-analysis.use-case';
import { DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/download-medical-question-generator-simplified-analysis.use-case';
import { GetMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/get-medical-question-generator.use-case';
import { UpdateMedicalQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/medical-question-generator/use-case/update-medical-question-generator.use-case';
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

@CustomerControllerRoute('analysis-tool/medical-question-generator')
export class MedicalQuestionGeneratorController {
  protected readonly _type = MedicalQuestionGeneratorController.name;

  public constructor(
    private readonly createMedicalQuestionGeneratorUseCase: CreateMedicalQuestionGeneratorUseCase,
    private readonly createMedicalQuestionGeneratorResultUseCase: CreateMedicalQuestionGeneratorResultUseCase,
    private readonly downloadMedicalQuestionGeneratorCompleteAnalysisUseCase: DownloadMedicalQuestionGeneratorCompleteAnalysisUseCase,
    private readonly downloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase: DownloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase,
    private readonly getMedicalQuestionGeneratorUseCase: GetMedicalQuestionGeneratorUseCase,
    private readonly updateMedicalQuestionGeneratorUseCase: UpdateMedicalQuestionGeneratorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar gerador de quesitos médicos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateMedicalQuestionGeneratorRequestDto,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Gerador de quesitos médicos criado com sucesso.',
      type: CreateMedicalQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createMedicalQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateMedicalQuestionGeneratorRequestDto,
  ): Promise<CreateMedicalQuestionGeneratorResponseDto> {
    return await this.createMedicalQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter gerador de quesitos médicos por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalQuestionGeneratorId',
      method: RequestMethod.GET,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do gerador de quesitos médicos retornados com sucesso.',
      type: GetMedicalQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getMedicalQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalQuestionGeneratorId',
      new ParseValueObjectPipe(MedicalQuestionGeneratorId),
    )
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
  ): Promise<GetMedicalQuestionGeneratorResponseDto> {
    return await this.getMedicalQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalQuestionGeneratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar gerador de quesitos médicos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalQuestionGeneratorId',
      method: RequestMethod.PATCH,
      type: UpdateMedicalQuestionGeneratorRequestDto,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Gerador de quesitos médicos atualizado com sucesso.',
      type: UpdateMedicalQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateMedicalQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateMedicalQuestionGeneratorRequestDto,
    @Param(
      'medicalQuestionGeneratorId',
      new ParseValueObjectPipe(MedicalQuestionGeneratorId),
    )
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
  ): Promise<UpdateMedicalQuestionGeneratorResponseDto> {
    return await this.updateMedicalQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalQuestionGeneratorId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do gerador de quesitos médicos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalQuestionGeneratorId/result',
      method: RequestMethod.POST,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do gerador de quesitos médicos criado com sucesso.',
      type: CreateMedicalQuestionGeneratorResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createMedicalQuestionGeneratorResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalQuestionGeneratorId',
      new ParseValueObjectPipe(MedicalQuestionGeneratorId),
    )
    id: MedicalQuestionGeneratorId,
  ): Promise<CreateMedicalQuestionGeneratorResultResponseDto> {
    return await this.createMedicalQuestionGeneratorResultUseCase.execute(
      sessionData,
      organizationSessionData,
      id,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa do gerador de quesitos médicos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalQuestionGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do gerador de quesitos médicos retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadMedicalQuestionGeneratorCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalQuestionGeneratorId',
      new ParseValueObjectPipe(MedicalQuestionGeneratorId),
    )
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadMedicalQuestionGeneratorCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalQuestionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada do gerador de quesitos médicos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalQuestionGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-quesitos-medicos'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do gerador de quesitos médicos retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadMedicalQuestionGeneratorSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalQuestionGeneratorId',
      new ParseValueObjectPipe(MedicalQuestionGeneratorId),
    )
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadMedicalQuestionGeneratorSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalQuestionGeneratorId,
      format,
    );
  }
}

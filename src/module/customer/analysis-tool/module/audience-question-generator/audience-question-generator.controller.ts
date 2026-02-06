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
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { CreateAudienceQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/create-audience-question-generator.request.dto';
import { UpdateAudienceQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/update-audience-question-generator.request.dto';
import { CreateAudienceQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator-result.response.dto';
import { CreateAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator.response.dto';
import { GetAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/get-audience-question-generator.response.dto';
import { UpdateAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/update-audience-question-generator.response.dto';
import { CreateAudienceQuestionGeneratorResultUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator-result.use-case';
import { CreateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/create-audience-question-generator.use-case';
import { DownloadAudienceQuestionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/download-audience-question-generator-complete-analysis.use-case';
import { DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/download-audience-question-generator-simplified-analysis.use-case';
import { GetAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/get-audience-question-generator.use-case';
import { UpdateAudienceQuestionGeneratorUseCase } from '@module/customer/analysis-tool/module/audience-question-generator/use-case/update-audience-question-generator.use-case';
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

@CustomerControllerRoute('analysis-tool/audience-question-generator')
export class AudienceQuestionGeneratorController {
  protected readonly _type = AudienceQuestionGeneratorController.name;

  public constructor(
    private readonly createAudienceQuestionGeneratorUseCase: CreateAudienceQuestionGeneratorUseCase,
    private readonly createAudienceQuestionGeneratorResultUseCase: CreateAudienceQuestionGeneratorResultUseCase,
    private readonly updateAudienceQuestionGeneratorUseCase: UpdateAudienceQuestionGeneratorUseCase,
    private readonly downloadAudienceQuestionGeneratorCompleteAnalysisUseCase: DownloadAudienceQuestionGeneratorCompleteAnalysisUseCase,
    private readonly downloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase: DownloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase,
    private readonly getAudienceQuestionGeneratorUseCase: GetAudienceQuestionGeneratorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId',
      method: RequestMethod.PATCH,
      type: UpdateAudienceQuestionGeneratorRequestDto,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Gerador de perguntas para audiência atualizado com sucesso.',
      type: UpdateAudienceQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAudienceQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateAudienceQuestionGeneratorRequestDto,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<UpdateAudienceQuestionGeneratorResponseDto> {
    return await this.updateAudienceQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
      dto,
    );
  }


  @BuildEndpointSpecification({
    summary: 'Criar gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAudienceQuestionGeneratorRequestDto,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Gerador de perguntas para audiência criado com sucesso.',
      type: CreateAudienceQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAudienceQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAudienceQuestionGeneratorRequestDto,
  ): Promise<CreateAudienceQuestionGeneratorResponseDto> {
    return await this.createAudienceQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter gerador de perguntas para audiência por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId',
      method: RequestMethod.GET,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do gerador de perguntas para audiência retornados com sucesso.',
      type: GetAudienceQuestionGeneratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAudienceQuestionGenerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<GetAudienceQuestionGeneratorResponseDto> {
    return await this.getAudienceQuestionGeneratorUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada do gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada do gerador de perguntas para audiência retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAudienceQuestionGeneratorSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAudienceQuestionGeneratorSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa do gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa do gerador de perguntas para audiência retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAudienceQuestionGeneratorCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAudienceQuestionGeneratorCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do gerador de perguntas para audiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':audienceQuestionGeneratorId/result',
      method: RequestMethod.POST,
    },
    tag: ['gerador-perguntas-audiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado do gerador de perguntas para audiência criado com sucesso.',
      type: CreateAudienceQuestionGeneratorResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAudienceQuestionGeneratorResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'audienceQuestionGeneratorId',
      new ParseValueObjectPipe(AudienceQuestionGeneratorId),
    )
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<CreateAudienceQuestionGeneratorResultResponseDto> {
    return await this.createAudienceQuestionGeneratorResultUseCase.execute(
      sessionData,
      organizationSessionData,
      audienceQuestionGeneratorId,
    );
  }
}

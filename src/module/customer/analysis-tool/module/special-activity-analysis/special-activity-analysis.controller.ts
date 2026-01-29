import {
  RequestMethod,
  HttpStatus,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  StreamableFile,
} from '@nestjs/common';

import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { CreateSpecialActivityAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/request/create-special-activity-analysis.request.dto';
import { UpdateSpecialActivityAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/request/update-special-activity-analysis.request.dto';
import { CreateSpecialActivityAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/create-special-activity-analysis-result.response.dto';
import { CreateSpecialActivityAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/create-special-activity-analysis.response.dto';
import { GetSpecialActivityAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/get-special-activity-analysis.response.dto';
import { UpdateSpecialActivityAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/update-special-activity-analysis.response.dto';
import { CreateSpecialActivityAnalysisResultUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/create-special-activity-analysis-result.use-case';
import { CreateSpecialActivityAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/create-special-activity-analysis.use-case';
import { DownloadSpecialActivityAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/download-special-activity-analysis-complete-analysis.use-case';
import { DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/download-special-activity-analysis-simplified-analysis.use-case';
import { GetSpecialActivityAnalysisByIdUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/get-special-activity-analysis-by-id.use-case';
import { UpdateSpecialActivityAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity-analysis/use-case/update-special-activity-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/special-activity')
export class SpecialActivityAnalysisController {
  protected readonly _type = SpecialActivityAnalysisController.name;

  public constructor(
    private readonly createSpecialActivityUseCase: CreateSpecialActivityAnalysisUseCase,
    private readonly updateSpecialActivityUseCase: UpdateSpecialActivityAnalysisUseCase,
    private readonly getSpecialActivityByIdUseCase: GetSpecialActivityAnalysisByIdUseCase,
    private readonly createSpecialActivityResultUseCase: CreateSpecialActivityAnalysisResultUseCase,
    private readonly downloadSpecialActivityCompleteAnalysisUseCase: DownloadSpecialActivityAnalysisCompleteAnalysisUseCase,
    private readonly downloadSpecialActivitySimplifiedAnalysisUseCase: DownloadSpecialActivityAnalysisSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de atividade especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpecialActivityAnalysisRequestDto,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de atividade especial criada com sucesso.',
      type: CreateSpecialActivityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialActivityAnalysisRequestDto,
  ): Promise<CreateSpecialActivityAnalysisResponseDto> {
    return await this.createSpecialActivityUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de atividade especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialActivityId',
      method: RequestMethod.PATCH,
      type: UpdateSpecialActivityAnalysisRequestDto,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de atividade especial atualizada com sucesso.',
      type: UpdateSpecialActivityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateSpecialActivityAnalysisRequestDto,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<UpdateSpecialActivityAnalysisResponseDto> {
    return await this.updateSpecialActivityUseCase.execute(
      sessionData,
      organizationSessionData,
      specialActivityId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de atividade especial por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialActivityId',
      method: RequestMethod.GET,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da análise de atividade especial retornados com sucesso.',
      type: GetSpecialActivityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<GetSpecialActivityAnalysisResponseDto> {
    return await this.getSpecialActivityByIdUseCase.execute(
      sessionData,
      organizationSessionData,
      specialActivityId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de atividade especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialActivityId/result',
      method: RequestMethod.POST,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise de atividade especial criado com sucesso.',
      type: CreateSpecialActivityAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialActivityResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<CreateSpecialActivityAnalysisResultResponseDto> {
    return await this.createSpecialActivityResultUseCase.execute(
      sessionData,
      organizationSessionData,
      specialActivityId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de atividade especial simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialActivityId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de atividade especial retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSpecialActivitySimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialActivitySimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialActivityId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de atividade especial completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialActivityId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de atividade especial retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSpecialActivityCompleteAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialActivityCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialActivityId,
      format,
    );
  }
}

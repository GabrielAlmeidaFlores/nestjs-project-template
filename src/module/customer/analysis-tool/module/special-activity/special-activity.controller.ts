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
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { CreateSpecialActivityRequestDto } from '@module/customer/analysis-tool/module/special-activity/dto/request/create-special-activity.request.dto';
import { UpdateSpecialActivityRequestDto } from '@module/customer/analysis-tool/module/special-activity/dto/request/update-special-activity.request.dto';
import { CreateSpecialActivityResultResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/create-special-activity-result.response.dto';
import { CreateSpecialActivityResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/create-special-activity.response.dto';
import { GetSpecialActivityResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/get-special-activity.response.dto';
import { UpdateSpecialActivityResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/update-special-activity.response.dto';
import { CreateSpecialActivityResultUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/create-special-activity-result.use-case';
import { CreateSpecialActivityUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/create-special-activity.use-case';
import { GetSpecialActivityByIdUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/get-special-activity-by-id.use-case';
import { UpdateSpecialActivityUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/update-special-activity.use-case';
import { DownloadSpecialActivityCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/download-special-activity-complete-analysis.use-case';
import { DownloadSpecialActivitySimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-activity/use-case/download-special-activity-simplified-analysis.use-case';
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
export class SpecialActivityController {
  protected readonly _type = SpecialActivityController.name;

  public constructor(
    private readonly createSpecialActivityUseCase: CreateSpecialActivityUseCase,
    private readonly updateSpecialActivityUseCase: UpdateSpecialActivityUseCase,
    private readonly getSpecialActivityByIdUseCase: GetSpecialActivityByIdUseCase,
    private readonly createSpecialActivityResultUseCase: CreateSpecialActivityResultUseCase,
    private readonly downloadSpecialActivityCompleteAnalysisUseCase: DownloadSpecialActivityCompleteAnalysisUseCase,
    private readonly downloadSpecialActivitySimplifiedAnalysisUseCase: DownloadSpecialActivitySimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de atividade especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpecialActivityRequestDto,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de atividade especial criada com sucesso.',
      type: CreateSpecialActivityResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialActivityRequestDto,
  ): Promise<CreateSpecialActivityResponseDto> {
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
      type: UpdateSpecialActivityRequestDto,
    },
    tag: ['atividade-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de atividade especial atualizada com sucesso.',
      type: UpdateSpecialActivityResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateSpecialActivityRequestDto,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<UpdateSpecialActivityResponseDto> {
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
      type: GetSpecialActivityResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpecialActivity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<GetSpecialActivityResponseDto> {
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
      type: CreateSpecialActivityResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialActivityResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('specialActivityId', new ParseValueObjectPipe(SpecialActivityId))
    specialActivityId: SpecialActivityId,
  ): Promise<CreateSpecialActivityResultResponseDto> {
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

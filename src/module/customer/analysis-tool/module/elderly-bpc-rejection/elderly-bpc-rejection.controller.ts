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
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { CreateElderlyBpcRejectionRequestDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/create-elderly-bpc-rejection.request.dto';
import { UpdateElderlyBpcRejectionRequestDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/update-elderly-bpc-rejection.request.dto';
import { CreateElderlyBpcRejectionResultResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/create-elderly-bpc-rejection-result.response.dto';
import { CreateElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/create-elderly-bpc-rejection.response.dto';
import { GetElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/get-elderly-bpc-rejection.response.dto';
import { UpdateElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/update-elderly-bpc-rejection.response.dto';
import { CreateElderlyBpcRejectionResultUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/create-elderly-bpc-rejection-result.use-case';
import { CreateElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/create-elderly-bpc-rejection.use-case';
import { DownloadElderlyBpcRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/download-elderly-bpc-rejection-complete-analysis.use-case';
import { DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/download-elderly-bpc-rejection-simplified-analysis.use-case';
import { GetElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/get-elderly-bpc-rejection.use-case';
import { UpdateElderlyBpcRejectionUseCase } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/use-case/update-elderly-bpc-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/elderly-bpc-rejection')
export class ElderlyBpcRejectionController {
  protected readonly _type = ElderlyBpcRejectionController.name;

  public constructor(
    private readonly createElderlyBpcRejectionUseCase: CreateElderlyBpcRejectionUseCase,
    private readonly updateElderlyBpcRejectionUseCase: UpdateElderlyBpcRejectionUseCase,
    private readonly getElderlyBpcRejectionUseCase: GetElderlyBpcRejectionUseCase,
    private readonly createElderlyBpcRejectionResultUseCase: CreateElderlyBpcRejectionResultUseCase,
    private readonly downloadElderlyBpcRejectionCompleteAnalysisUseCase: DownloadElderlyBpcRejectionCompleteAnalysisUseCase,
    private readonly downloadElderlyBpcRejectionSimplifiedAnalysisUseCase: DownloadElderlyBpcRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de BPC idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateElderlyBpcRejectionRequestDto,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de indeferimento de BPC idoso criada com sucesso.',
      type: CreateElderlyBpcRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateElderlyBpcRejectionRequestDto,
  ): Promise<CreateElderlyBpcRejectionResponseDto> {
    return this.createElderlyBpcRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de BPC idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':elderlyBpcRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateElderlyBpcRejectionRequestDto,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de BPC idoso atualizada com sucesso.',
      type: UpdateElderlyBpcRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'elderlyBpcRejectionId',
      new ParseValueObjectPipe(ElderlyBpcRejectionId),
    )
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    @Body() dto: UpdateElderlyBpcRejectionRequestDto,
  ): Promise<UpdateElderlyBpcRejectionResponseDto> {
    return this.updateElderlyBpcRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      elderlyBpcRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de BPC idoso por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':elderlyBpcRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de BPC idoso retornada com sucesso.',
      type: GetElderlyBpcRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'elderlyBpcRejectionId',
      new ParseValueObjectPipe(ElderlyBpcRejectionId),
    )
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): Promise<GetElderlyBpcRejectionResponseDto> {
    return this.getElderlyBpcRejectionUseCase.execute(elderlyBpcRejectionId);
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise completa de indeferimento de BPC idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':elderlyBpcRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de indeferimento de BPC idoso gerada com sucesso.',
      type: CreateElderlyBpcRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'elderlyBpcRejectionId',
      new ParseValueObjectPipe(ElderlyBpcRejectionId),
    )
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): Promise<CreateElderlyBpcRejectionResultResponseDto> {
    return this.createElderlyBpcRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      elderlyBpcRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa de indeferimento de BPC idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':elderlyBpcRejectionId/result/download/complete',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise completa de indeferimento de BPC idoso baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'elderlyBpcRejectionId',
      new ParseValueObjectPipe(ElderlyBpcRejectionId),
    )
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadElderlyBpcRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      elderlyBpcRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada de indeferimento de BPC idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':elderlyBpcRejectionId/result/download/simplified',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise simplificada de indeferimento de BPC idoso baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'elderlyBpcRejectionId',
      new ParseValueObjectPipe(ElderlyBpcRejectionId),
    )
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadElderlyBpcRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      elderlyBpcRejectionId,
      format,
    );
  }
}

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
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { CreateBpcDisabilityGrantFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/create-bpc-disability-grant-family-member.request.dto';
import { CreateBpcDisabilityGrantRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/create-bpc-disability-grant.request.dto';
import { UpdateBpcDisabilityGrantFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/update-bpc-disability-grant-family-member.request.dto';
import { UpdateBpcDisabilityGrantRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/update-bpc-disability-grant.request.dto';
import { CreateBpcDisabilityGrantFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-family-member.response.dto';
import { CreateBpcDisabilityGrantResultResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-result.response.dto';
import { CreateBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant.response.dto';
import { GetBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/get-bpc-disability-grant.response.dto';
import { UpdateBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/update-bpc-disability-grant.response.dto';
import { CreateBpcDisabilityGrantFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant-family-member.use-case';
import { CreateBpcDisabilityGrantResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant-result.use-case';
import { CreateBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/create-bpc-disability-grant.use-case';
import { DownloadBpcDisabilityGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/download-bpc-disability-grant-complete-analysis.use-case';
import { DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/download-bpc-disability-grant-simplified-analysis.use-case';
import { GetBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/get-bpc-disability-grant.use-case';
import { UpdateBpcDisabilityGrantFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/update-bpc-disability-grant-family-member.use-case';
import { UpdateBpcDisabilityGrantUseCase } from '@module/customer/analysis-tool/module/bpc-disability-grant/use-case/update-bpc-disability-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/bpc-disability-grant')
export class BpcDisabilityGrantController {
  protected readonly _type = BpcDisabilityGrantController.name;

  public constructor(
    private readonly createBpcDisabilityGrantUseCase: CreateBpcDisabilityGrantUseCase,
    private readonly createBpcDisabilityGrantFamilyMemberUseCase: CreateBpcDisabilityGrantFamilyMemberUseCase,
    private readonly updateBpcDisabilityGrantFamilyMemberUseCase: UpdateBpcDisabilityGrantFamilyMemberUseCase,
    private readonly createBpcDisabilityGrantResultUseCase: CreateBpcDisabilityGrantResultUseCase,
    private readonly downloadBpcDisabilityGrantCompleteAnalysisUseCase: DownloadBpcDisabilityGrantCompleteAnalysisUseCase,
    private readonly downloadBpcDisabilityGrantSimplifiedAnalysisUseCase: DownloadBpcDisabilityGrantSimplifiedAnalysisUseCase,
    private readonly getBpcDisabilityGrantUseCase: GetBpcDisabilityGrantUseCase,
    private readonly updateBpcDisabilityGrantUseCase: UpdateBpcDisabilityGrantUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de BPC Pessoa com Deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityGrantRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateBpcDisabilityGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateBpcDisabilityGrantRequestDto,
  ): Promise<CreateBpcDisabilityGrantResponseDto> {
    return this.createBpcDisabilityGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cadastrar membros do grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':BpcDisabilityGrantId/family-member',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityGrantFamilyMemberRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Grupo familiar cadastrado com sucesso.',
      type: CreateBpcDisabilityGrantFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityGrantFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    @Body() dto: CreateBpcDisabilityGrantFamilyMemberRequestDto,
  ): Promise<CreateBpcDisabilityGrantFamilyMemberResponseDto> {
    return this.createBpcDisabilityGrantFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':BpcDisabilityGrantId/family-member',
      method: RequestMethod.PATCH,
      type: UpdateBpcDisabilityGrantFamilyMemberRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Grupo familiar atualizado com sucesso.',
      type: UpdateBpcDisabilityGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcDisabilityGrantFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    @Body() dto: UpdateBpcDisabilityGrantFamilyMemberRequestDto,
  ): Promise<UpdateBpcDisabilityGrantResponseDto> {
    return this.updateBpcDisabilityGrantFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado final da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':BpcDisabilityGrantId/result', method: RequestMethod.POST },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateBpcDisabilityGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityGrantResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): Promise<CreateBpcDisabilityGrantResultResponseDto> {
    return this.createBpcDisabilityGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':BpcDisabilityGrantId', method: RequestMethod.GET },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise encontrada com sucesso.',
      type: GetBpcDisabilityGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBpcDisabilityGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): Promise<GetBpcDisabilityGrantResponseDto> {
    return this.getBpcDisabilityGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados gerais da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':BpcDisabilityGrantId',
      method: RequestMethod.PATCH,
      type: UpdateBpcDisabilityGrantRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateBpcDisabilityGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcDisabilityGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    @Body() dto: UpdateBpcDisabilityGrantRequestDto,
  ): Promise<UpdateBpcDisabilityGrantResponseDto> {
    return this.updateBpcDisabilityGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':BpcDisabilityGrantId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityGrantCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityGrantCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':BpcDisabilityGrantId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityGrantSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'BpcDisabilityGrantId',
      new ParseValueObjectPipe(BpcDisabilityGrantId),
    )
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityGrantSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityGrantId,
      format,
    );
  }
}

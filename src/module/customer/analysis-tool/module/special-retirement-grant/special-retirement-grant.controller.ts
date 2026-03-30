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
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { CreateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant.request.dto';
import { UpdateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant.request.dto';
import { CreateSpecialRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-cnis.response.dto';
import { CreateSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-result.response.dto';
import { CreateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant.response.dto';
import { DeleteSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/delete-special-retirement-grant.response.dto';
import { GetSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/get-special-retirement-grant.response.dto';
import { UpdateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant.response.dto';
import { CreateSpecialRetirementGrantCnisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-cnis.use-case';
import { CreateSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-result.use-case';
import { CreateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant.use-case';
import { DeleteSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/delete-special-retirement-grant.use-case';
import { DownloadSpecialRetirementGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-complete-analysis.use-case';
import { DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-simplified-analysis.use-case';
import { GetSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant.use-case';
import { UpdateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/special-retirement-grant')
export class SpecialRetirementGrantController {
  protected readonly _type = SpecialRetirementGrantController.name;

  public constructor(
    private readonly createSpecialRetirementGrantUseCase: CreateSpecialRetirementGrantUseCase,
    private readonly createSpecialRetirementGrantCnisUseCase: CreateSpecialRetirementGrantCnisUseCase,
    private readonly getSpecialRetirementGrantUseCase: GetSpecialRetirementGrantUseCase,
    private readonly updateSpecialRetirementGrantUseCase: UpdateSpecialRetirementGrantUseCase,
    private readonly deleteSpecialRetirementGrantUseCase: DeleteSpecialRetirementGrantUseCase,
    private readonly createSpecialRetirementGrantResultUseCase: CreateSpecialRetirementGrantResultUseCase,
    private readonly downloadSpecialRetirementGrantCompleteAnalysisUseCase: DownloadSpecialRetirementGrantCompleteAnalysisUseCase,
    private readonly downloadSpecialRetirementGrantSimplifiedAnalysisUseCase: DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSpecialRetirementGrantRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Concessão de aposentadoria especial criada com sucesso.',
      type: CreateSpecialRetirementGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialRetirementGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSpecialRetirementGrantRequestDto,
  ): Promise<CreateSpecialRetirementGrantResponseDto> {
    return await this.createSpecialRetirementGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar períodos e remunerações a partir do CNIS (linha do tempo integrada)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/cnis',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos e remunerações criados com sucesso.',
      type: CreateSpecialRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialRetirementGrantCnisPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantCnisResponseDto> {
    return await this.createSpecialRetirementGrantCnisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter concessão de aposentadoria especial por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da concessão de aposentadoria especial retornados com sucesso.',
      type: GetSpecialRetirementGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpecialRetirementGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantResponseDto> {
    return await this.getSpecialRetirementGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementGrantRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Concessão de aposentadoria especial atualizada com sucesso.',
      type: UpdateSpecialRetirementGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSpecialRetirementGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Body() dto: UpdateSpecialRetirementGrantRequestDto,
  ): Promise<UpdateSpecialRetirementGrantResponseDto> {
    return await this.updateSpecialRetirementGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId',
      method: RequestMethod.DELETE,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Concessão de aposentadoria especial deletada com sucesso.',
      type: DeleteSpecialRetirementGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteSpecialRetirementGrant(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<DeleteSpecialRetirementGrantResponseDto> {
    return await this.deleteSpecialRetirementGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/result',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da concessão de aposentadoria especial criado com sucesso.',
      type: CreateSpecialRetirementGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSpecialRetirementGrantResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantResultResponseDto> {
    return await this.createSpecialRetirementGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-especial'],
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
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialRetirementGrantCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-especial'],
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
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadSpecialRetirementGrantSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      format,
    );
  }
}

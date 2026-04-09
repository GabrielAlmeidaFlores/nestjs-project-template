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
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';
import { CreateSpecialRetirementGrantPeriodObservationRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period-observation.request.dto';
import { CreateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period.request.dto';
import { CreateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant.request.dto';
import { UpdateSpecialRetirementGrantPeriodObservationRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant-period-observation.request.dto';
import { UpdateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant-period.request.dto';
import { UpdateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant.request.dto';
import { CreateSpecialRetirementGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-first-analysis.response.dto';
import { CreateSpecialRetirementGrantPeriodObservationResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-period-observation.response.dto';
import { CreateSpecialRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-period.response.dto';
import { CreateSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-result.response.dto';
import { CreateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant.response.dto';
import { DeleteSpecialRetirementGrantPeriodObservationResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/delete-special-retirement-grant-period-observation.response.dto';
import { GetSpecialRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/get-special-retirement-grant-result.response.dto';
import { GetSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/get-special-retirement-grant.response.dto';
import { UpdateSpecialRetirementGrantPeriodObservationResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant-period-observation.response.dto';
import { UpdateSpecialRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant-period.response.dto';
import { UpdateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant.response.dto';
import { CreateSpecialRetirementGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-first-analysis.use-case';
import { CreateSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-period-observation.use-case';
import { CreateSpecialRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-period.use-case';
import { CreateSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant-result.use-case';
import { CreateSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/create-special-retirement-grant.use-case';
import { DeleteSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/delete-special-retirement-grant-period-observation.use-case';
import { DownloadSpecialRetirementGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-complete-analysis.use-case';
import { DownloadSpecialRetirementGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/download-special-retirement-grant-simplified-analysis.use-case';
import { GetSpecialRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant-result.use-case';
import { GetSpecialRetirementGrantUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/get-special-retirement-grant.use-case';
import { UpdateSpecialRetirementGrantPeriodObservationUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant-period-observation.use-case';
import { UpdateSpecialRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/special-retirement-grant/use-case/update-special-retirement-grant-period.use-case';
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
    private readonly createSpecialRetirementGrantFirstAnalysisUseCase: CreateSpecialRetirementGrantFirstAnalysisUseCase,
    private readonly createSpecialRetirementGrantPeriodUseCase: CreateSpecialRetirementGrantPeriodUseCase,
    private readonly updateSpecialRetirementGrantPeriodUseCase: UpdateSpecialRetirementGrantPeriodUseCase,
    private readonly createSpecialRetirementGrantPeriodObservationUseCase: CreateSpecialRetirementGrantPeriodObservationUseCase,
    private readonly updateSpecialRetirementGrantPeriodObservationUseCase: UpdateSpecialRetirementGrantPeriodObservationUseCase,
    private readonly deleteSpecialRetirementGrantPeriodObservationUseCase: DeleteSpecialRetirementGrantPeriodObservationUseCase,
    private readonly getSpecialRetirementGrantUseCase: GetSpecialRetirementGrantUseCase,
    private readonly getSpecialRetirementGrantResultUseCase: GetSpecialRetirementGrantResultUseCase,
    private readonly updateSpecialRetirementGrantUseCase: UpdateSpecialRetirementGrantUseCase,
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
    summary: 'Obter resultado da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/result',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Resultado da concessão de aposentadoria especial retornado com sucesso.',
      type: GetSpecialRetirementGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSpecialRetirementGrantResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantResultResponseDto> {
    return await this.getSpecialRetirementGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis criada com sucesso.',
      type: CreateSpecialRetirementGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<CreateSpecialRetirementGrantFirstAnalysisResponseDto> {
    return await this.createSpecialRetirementGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/period',
      method: RequestMethod.POST,
      type: CreateSpecialRetirementGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateSpecialRetirementGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Body() dto: CreateSpecialRetirementGrantPeriodRequestDto,
  ): Promise<CreateSpecialRetirementGrantPeriodResponseDto> {
    return await this.createSpecialRetirementGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da concessão de aposentadoria especial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/period',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateSpecialRetirementGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Body() dto: UpdateSpecialRetirementGrantPeriodRequestDto,
  ): Promise<UpdateSpecialRetirementGrantPeriodResponseDto> {
    return await this.updateSpecialRetirementGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar observação em um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/period/:periodId/observation',
      method: RequestMethod.POST,
      type: CreateSpecialRetirementGrantPeriodObservationRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Observação criada com sucesso.',
      type: CreateSpecialRetirementGrantPeriodObservationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriodObservation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Param('periodId', new ParseValueObjectPipe(SpecialRetirementGrantPeriodId))
    periodId: SpecialRetirementGrantPeriodId,
    @Body() dto: CreateSpecialRetirementGrantPeriodObservationRequestDto,
  ): Promise<CreateSpecialRetirementGrantPeriodObservationResponseDto> {
    return await this.createSpecialRetirementGrantPeriodObservationUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      periodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar observação de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':specialRetirementGrantId/period/:periodId/observation',
      method: RequestMethod.PATCH,
      type: UpdateSpecialRetirementGrantPeriodObservationRequestDto,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Observação atualizada com sucesso.',
      type: UpdateSpecialRetirementGrantPeriodObservationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriodObservation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'specialRetirementGrantId',
      new ParseValueObjectPipe(SpecialRetirementGrantId),
    )
    specialRetirementGrantId: SpecialRetirementGrantId,
    @Param('periodId', new ParseValueObjectPipe(SpecialRetirementGrantPeriodId))
    periodId: SpecialRetirementGrantPeriodId,
    @Body() dto: UpdateSpecialRetirementGrantPeriodObservationRequestDto,
  ): Promise<UpdateSpecialRetirementGrantPeriodObservationResponseDto> {
    return await this.updateSpecialRetirementGrantPeriodObservationUseCase.execute(
      sessionData,
      organizationSessionData,
      specialRetirementGrantId,
      periodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir observação de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period-observation/:observationId',
      method: RequestMethod.DELETE,
    },
    tag: ['concessao-aposentadoria-especial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Observação excluída com sucesso.',
      type: DeleteSpecialRetirementGrantPeriodObservationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriodObservation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'observationId',
      new ParseValueObjectPipe(SpecialRetirementGrantPeriodObservationId),
    )
    observationId: SpecialRetirementGrantPeriodObservationId,
  ): Promise<DeleteSpecialRetirementGrantPeriodObservationResponseDto> {
    return await this.deleteSpecialRetirementGrantPeriodObservationUseCase.execute(
      sessionData,
      organizationSessionData,
      observationId,
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

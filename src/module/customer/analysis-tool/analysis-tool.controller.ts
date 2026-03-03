import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { GetAnalysisToolRecordStatisticsRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-record-statistics.request.dto';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalProceedingDetailWithCombinedFiltersRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-proceeding-detail-with-combined-filters.request.dto';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { DeleteAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-record.response';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { GetAnalysisToolRecordStatisticsResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-record-statistics.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { ListAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-record.response.dto';
import { ListCidTenResponseDto } from '@module/customer/analysis-tool/dto/response/list-cid-ten.response.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetAnalysisToolRecordStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-record-statistics.use-case';
import { ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client-legal-proceeding-with-combined-filters.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/use-case/list-cid-ten.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool')
export class AnalysisToolController {
  protected readonly _type = AnalysisToolController.name;

  public constructor(
    private readonly listAnalysisToolClientUseCase: ListAnalysisToolClientUseCase,
    private readonly createAnalysisToolClientUseCase: CreateAnalysisToolClientUseCase,
    private readonly listAnalysisToolRecordUseCase: ListAnalysisToolRecordUseCase,
    private readonly updateAnalysisToolClientUseCase: UpdateAnalysisToolClientUseCase,
    private readonly getAnalysisToolClientUseCase: GetAnalysisToolClientUseCase,
    private readonly deleteAnalysisToolClientUseCase: DeleteAnalysisToolClientUseCase,
    private readonly deleteAnalysisToolRecordUseCase: DeleteAnalysisToolRecordUseCase,
    private readonly listCidTenUseCase: ListCidTenUseCase,
    private readonly getAnalysisToolRecordStatisticsUseCase: GetAnalysisToolRecordStatisticsUseCase,
    private readonly listAnalysisToolClientLegalProceedingUseCase: ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record',
      method: RequestMethod.GET,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de registros de análises retornada com sucesso.',
      type: ListAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListAnalysisToolRecordRequestDto,
  ): Promise<ListAnalysisToolRecordResponseDto> {
    return await this.listAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter estatísticas de registros de análises por período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record/statistics',
      method: RequestMethod.GET,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Estatísticas retornadas com sucesso.',
      type: GetAnalysisToolRecordStatisticsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAnalysisToolRecordStatistics(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: GetAnalysisToolRecordStatisticsRequestDto,
  ): Promise<GetAnalysisToolRecordStatisticsResponseDto> {
    return await this.getAnalysisToolRecordStatisticsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record/:analysisToolRecordId',
      method: RequestMethod.DELETE,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Registro de análise deletado com sucesso.',
      type: DeleteAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolRecordId',
      new ParseValueObjectPipe(AnalysisToolRecordId),
    )
    analysisToolRecordId: AnalysisToolRecordId,
  ): Promise<DeleteAnalysisToolRecordResponseDto> {
    return await this.deleteAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolRecordId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar clientes da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de clientes da análise retornada com sucesso.',
      type: ListAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData()
    sessionData: SessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    return await this.listAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.POST,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente da análise criado com sucesso.',
      type: CreateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAnalysisToolClientRequestDto,
  ): Promise<CreateAnalysisToolClientResponseDto> {
    return await this.createAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':analysisToolClientId',
      method: RequestMethod.PATCH,
      type: UpdateAnalysisToolClientRequestDto,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente atualizado com sucesso.',
      type: UpdateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
    @Body() dto: UpdateAnalysisToolClientRequestDto,
  ): Promise<UpdateAnalysisToolClientResponseDto> {
    return await this.updateAnalysisToolClientUseCase.execute(
      analysisToolClientId,
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter cliente da análise por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do cliente da análise retornados com sucesso.',
      type: GetAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData()
    sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientResponseDto> {
    return await this.getAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.DELETE,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cliente da análise deletado com sucesso.',
      type: DeleteAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    return await this.deleteAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar processos jurídicos vinculados aos clientes',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client-legal-proceeding',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de processos jurídicos retornada com sucesso.',
      type: ListAnalysisToolClientLegalProceedingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolClientLegalProceeding(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalProceedingDetailWithCombinedFiltersRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    return await this.listAnalysisToolClientLegalProceedingUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar CID-10',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cid-ten',
      method: RequestMethod.GET,
    },
    tag: ['cid-ten'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de CID-10 retornada com sucesso.',
      type: ListCidTenResponseDto,
    },
  })
  public async listCidTen(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCidTenResponseDto> {
    return await this.listCidTenUseCase.execute(dto);
  }
}

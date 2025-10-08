import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { DeleteCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/delete-cnis-fast-analysis.response';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { ListCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/list-cnis-fast-analysis.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import DeleteCnisFastAnalysisUseCase from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/list-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool')
export class AnalysisToolController {
  protected readonly _type = AnalysisToolController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
    private readonly listCnisFastAnalysisUseCase: ListCnisFastAnalysisUseCase,
    private readonly listAnalysisToolClientUseCase: ListAnalysisToolClientUseCase,
    private readonly createAnalysisToolClientUseCase: CreateAnalysisToolClientUseCase,
    private readonly deleteAnalysisToolClientUseCase: DeleteAnalysisToolClientUseCase,
    private readonly deleteCnisFastAnalysisUseCase: DeleteCnisFastAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'List analysis tool clients',
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.GET,
    },
    tag: ['analysis-tool-client'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Analysis tool client list',
      type: ListAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    return await this.listAnalysisToolClientUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Create analysis tool client',
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.POST,
      type: CreateAnalysisToolClientRequestDto,
    },
    tag: ['analysis-tool-client'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Analysis tool client created successfully',
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
    summary: 'Create a cnis fast analysis',
    http: {
      path: 'cnis-fast-analysis',
      method: RequestMethod.POST,
      type: CreateCnisFastAnalysisRequestDto,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cnis fast analysis created successfully',
      type: CreateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    return await this.createCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Update cnis fast analysis',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateCnisFastAnalysisRequestDto,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cnis fast analysis updated successfully',
      type: UpdateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Body()
    dto: UpdateCnisFastAnalysisRequestDto,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
    return await this.updateCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Delete analysis tool clients',
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.DELETE,
    },
    tag: ['analysis-tool-client'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Analysis tool client deleted successfully',
      type: DeleteAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async removeAnalysisToolClient(
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
    summary: 'Delete cnis fast analysis',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.DELETE,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cnis fast analysis deleted successfully',
      type: DeleteCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async removeCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<DeleteCnisFastAnalysisResponseDto> {
    return await this.deleteCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Get cnis fast analysis',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cnis fast analysis data',
      type: GetCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<GetCnisFastAnalysisResponseDto> {
    return await this.getCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'List cnis fast analysis',
    http: {
      path: 'cnis-fast-analysis',
      method: RequestMethod.GET,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cnis fast analysis list',
      type: ListCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCnisFastAnalysisResponseDto> {
    return await this.listCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Create cnis fast analysis result',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['cnis-fast-analysis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cnis fast analysis result created successfully',
      type: CreateCnisFastAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    return await this.createCnisFastAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }
}

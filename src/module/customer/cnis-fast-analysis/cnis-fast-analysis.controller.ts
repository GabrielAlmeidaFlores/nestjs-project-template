import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/cnis-fast-analysis/dto/request/update-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/get-cnis-fast-analysis.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/update-cnis-fast-analysis.response.dto';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/update-cnis-fast-analysis.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';

@CustomerControllerRoute('cnis-fast-analysis')
export class CnisFastAnalysisController {
  protected readonly _type = CnisFastAnalysisController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Create a cnis fast analysis',
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateCnisFastAnalysisRequestDto,
    },
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
      path: ':cnisFastAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateCnisFastAnalysisRequestDto,
    },
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
    summary: 'Get cnis fast analysis',
    http: {
      path: ':cnisFastAnalysisId',
      method: RequestMethod.GET,
    },
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
    summary: 'Create cnis fast analysis result',
    http: {
      path: ':cnisFastAnalysisId/result',
      method: RequestMethod.POST,
    },
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

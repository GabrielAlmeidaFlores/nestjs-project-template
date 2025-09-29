import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { CreateCnisFastAnalysisRequestDto } from '@module/customer/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@CustomerControllerRoute('cnis-fast-analysis')
export class CnisFastAnalysisController {
  protected readonly _type = CnisFastAnalysisController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
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
}

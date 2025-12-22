import { HttpStatus, Inject, RequestMethod } from '@nestjs/common';

import { GetOrganizationAvailableCreditsResponseDto } from '@module/customer/organization-credit/dto/response/get-organization-available-credits.response.dto';
import { GetOrganizationAvailableCreditsUseCase } from '@module/customer/organization-credit/use-case/get-organization-available-credits.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('organization-credit')
export class OrganizationCreditController {
  protected readonly _type = OrganizationCreditController.name;

  public constructor(
    @Inject(GetOrganizationAvailableCreditsUseCase)
    private readonly getOrganizationAvailableCreditsUseCase: GetOrganizationAvailableCreditsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Consultar créditos disponíveis da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'available',
      method: RequestMethod.GET,
    },
    tag: ['credito-da-organizacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Créditos disponíveis consultados com sucesso.',
      type: GetOrganizationAvailableCreditsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAvailableCredits(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetOrganizationAvailableCreditsResponseDto> {
    return this.getOrganizationAvailableCreditsUseCase.execute(
      organizationSessionData.organizationId,
    );
  }
}

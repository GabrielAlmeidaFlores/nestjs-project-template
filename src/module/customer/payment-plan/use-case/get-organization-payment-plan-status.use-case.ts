import { Injectable } from '@nestjs/common';

import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { OrganizationOwnerRequiredError } from '@module/customer/payment-plan/error/organization-owner-required.error';
import { ValidateOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/validate-organization-payment-plan-status.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetOrganizationPaymentPlanStatusUseCase {
  protected readonly _type = GetOrganizationPaymentPlanStatusUseCase.name;

  public constructor(
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto> {
    if (!organizationSessionData.owner) {
      throw new OrganizationOwnerRequiredError();
    }
    return this.validateOrganizationPaymentPlanStatusUseCase.execute(
      organizationSessionData.organizationId,
    );
  }
}

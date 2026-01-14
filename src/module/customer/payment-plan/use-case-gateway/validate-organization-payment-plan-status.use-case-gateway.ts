import { Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';

@Injectable()
export abstract class ValidateOrganizationPaymentPlanStatusUseCaseGateway {
  public abstract execute(
    organization: OrganizationId,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto>;
}

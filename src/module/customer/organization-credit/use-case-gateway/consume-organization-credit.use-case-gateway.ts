import { Injectable } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

@Injectable()
export abstract class ConsumeOrganizationCreditUseCaseGateway {
  public abstract execute(
    organizationId: OrganizationId,
    resourceType: PaymentPlanPaidResourceTypeEnum,
    createdBy: OrganizationMemberId | null,
  ): Promise<TransactionType>;
}

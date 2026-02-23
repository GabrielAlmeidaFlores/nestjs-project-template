import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetCustomerProfileQueryResult extends BaseBuildableObject {
  public readonly customerId: CustomerId;
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly phoneNumber: PhoneNumber;
  public readonly createdAt: Date;
  public readonly paymentPlanName: string;
  public readonly paymentPlanPrice: DecimalValue;
  public readonly paymentPlanCycle: PaymentPlanCycleEnum;
  public readonly customerAddress?: GetCustomerAddressQueryResult;

  protected override readonly _type = GetCustomerProfileQueryResult.name;
}

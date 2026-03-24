import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';

export class GetAffiliateCustomerQueryResult extends BaseBuildableObject {
  public readonly id: AffiliateCustomerId;
  public readonly customerId: CustomerId;
  public readonly customerName: string;
  public readonly customerEmail: Email;
  public readonly customerFederalDocument: FederalDocument;
  public readonly customerPhoneNumber: PhoneNumber;
  public readonly pixAddressKey: PixAddressKey | null;
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum | null;
  public readonly paymentCommissionPercentage: number;
  public readonly paymentPlanDiscountPercentage: number;
  public readonly paymentPlanDiscountValidUntil: Date;
  public readonly paymentPlanDiscountRedemptionLimit: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetAffiliateCustomerQueryResult.name;
}

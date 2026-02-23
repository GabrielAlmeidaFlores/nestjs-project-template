import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export interface GetCustomerWithOrganizationForListQueryResultPropsInterface {
  customerId: CustomerId;
  customerName: string;
  customerEmail: Email;
  customerDocument: FederalDocument;
  customerCreatedAt: Date;
  organizationId: OrganizationId | null;
  organizationName: string | null;
  isOrganizationOwner: boolean;
}

export class GetCustomerWithOrganizationForListQueryResult extends BaseBuildableObject {
  public readonly customerId: CustomerId;
  public readonly customerName: string;
  public readonly customerEmail: Email;
  public readonly customerDocument: FederalDocument;
  public readonly customerCreatedAt: Date;
  public readonly organizationId: OrganizationId | null;
  public readonly organizationName: string | null;
  public readonly isOrganizationOwner: boolean;

  protected override readonly _type =
    GetCustomerWithOrganizationForListQueryResult.name;

  public constructor(
    props: GetCustomerWithOrganizationForListQueryResultPropsInterface,
  ) {
    super();
    this.customerId = props.customerId;
    this.customerName = props.customerName;
    this.customerEmail = props.customerEmail;
    this.customerDocument = props.customerDocument;
    this.customerCreatedAt = props.customerCreatedAt;
    this.organizationId = props.organizationId;
    this.organizationName = props.organizationName;
    this.isOrganizationOwner = props.isOrganizationOwner;
  }
}

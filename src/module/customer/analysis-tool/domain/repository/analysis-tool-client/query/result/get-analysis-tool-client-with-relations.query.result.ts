import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

export class GetAnalysisToolClientWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientId;
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly email: Email | null;
  public readonly phoneNumber: PhoneNumber | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly clientType: AnalysisToolClientTypeEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;

  protected override readonly _type =
    GetAnalysisToolClientWithRelationsQueryResult.name;
}

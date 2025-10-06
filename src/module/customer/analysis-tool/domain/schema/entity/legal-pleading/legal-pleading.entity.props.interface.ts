import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

export interface LegalPleadingEntityPropsInterface
  extends BaseEntityPropsInterface<LegalPleadingId> {
  analysisToolClient: AnalysisToolClientEntity;
  legalPleadingAddress?: LegalPleadingAddressEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

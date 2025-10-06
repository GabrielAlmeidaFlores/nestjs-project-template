import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { LegalPleadingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity.props.interface';
import type { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';

export class LegalPleadingEntity extends BaseEntity<LegalPleadingId> {
  public readonly analysisToolClient: AnalysisToolClientEntity;
  public readonly legalPleadingAddress: LegalPleadingAddressEntity | null;
  public readonly createdBy: OrganizationMemberId;
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = LegalPleadingEntity.name;

  public constructor(props: LegalPleadingEntityPropsInterface) {
    super(LegalPleadingId, props);

    this.legalPleadingAddress = props.legalPleadingAddress ?? null;
    this.analysisToolClient = props.analysisToolClient;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}

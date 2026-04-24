import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';
import type { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';
import type { BpcDisabilityDenialFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/value-object/bpc-disability-denial-family-member-document-id/bpc-disability-denial-family-member-document-id.value-object';

export interface BpcDisabilityDenialFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialFamilyMemberDocumentId> {
  document: string;
  type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;
  bpcDisabilityDenialFamilyMember: BpcDisabilityDenialFamilyMemberEntity;
}

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';
import type { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';
import type { BpcDisabilityTerminationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/value-object/bpc-disability-termination-family-member-document-id/bpc-disability-termination-family-member-document-id.value-object';

export interface BpcDisabilityTerminationFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationFamilyMemberDocumentId> {
  document: string;
  type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;
  bpcDisabilityTerminationFamilyMember: BpcDisabilityTerminationFamilyMemberEntity;
}

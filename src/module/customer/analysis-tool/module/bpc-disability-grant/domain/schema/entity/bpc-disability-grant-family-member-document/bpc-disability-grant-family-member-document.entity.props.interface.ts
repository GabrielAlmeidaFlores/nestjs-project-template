import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';
import type { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';
import type { BpcDisabilityGrantFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/value-object/bpc-disability-grant-family-member-document-id/bpc-disability-grant-family-member-document-id.value-object';

export interface BpcDisabilityGrantFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantFamilyMemberDocumentId> {
  document: string;
  type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;
  BpcDisabilityGrantFamilyMemberId: BpcDisabilityGrantFamilyMemberId;
}

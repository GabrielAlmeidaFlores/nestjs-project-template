import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';
import type { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';
import type { BpcElderlyCessationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/value-object/bpc-elderly-cessation-family-member-document-id/bpc-elderly-cessation-family-member-document-id.value-object';

export interface BpcElderlyCessationFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationFamilyMemberDocumentId> {
  document: string;
  type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;
  bpcElderlyCessationFamilyMember: BpcElderlyCessationFamilyMemberEntity;
}

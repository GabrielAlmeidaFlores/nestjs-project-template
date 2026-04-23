import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import type { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';
import type { BpcElderlyAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/value-object/bpc-elderly-analysis-family-member-document-id/bpc-elderly-analysis-family-member-document-id.value-object';

export interface BpcElderlyAnalysisFamilyMemberDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisFamilyMemberDocumentId> {
  document: string;
  type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;
  bpcElderlyAnalysisFamilyMember: BpcElderlyAnalysisFamilyMemberEntity;
}

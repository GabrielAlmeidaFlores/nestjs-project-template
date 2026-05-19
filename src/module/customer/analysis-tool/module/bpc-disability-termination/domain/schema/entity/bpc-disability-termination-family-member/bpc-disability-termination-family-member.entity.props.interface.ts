import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import type { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import type { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';
import type { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';
import type { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';

export interface BpcDisabilityTerminationFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum | null;
  hasExpenseProofs?: boolean | null;
  bpcDisabilityTermination: BpcDisabilityTerminationEntity;
  bpcDisabilityTerminationFamilyMemberDocument?:
    | BpcDisabilityTerminationFamilyMemberDocumentEntity[]
    | null;
}

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import type { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import type { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';
import type { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';
import type { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';

export interface BpcDisabilityDenialFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: BpcDisabilityDenialFamilyMemberIncomeTypeEnum | null;
  hasExpenseProofs?: boolean | null;
  bpcDisabilityDenial: BpcDisabilityDenialEntity;
  bpcDisabilityDenialFamilyMemberDocument?:
    | BpcDisabilityDenialFamilyMemberDocumentEntity[]
    | null;
}

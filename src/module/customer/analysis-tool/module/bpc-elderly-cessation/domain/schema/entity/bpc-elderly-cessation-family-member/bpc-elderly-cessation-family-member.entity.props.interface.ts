import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import type { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import type { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';
import type { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';
import type { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';

export interface BpcElderlyCessationFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: BpcElderlyCessationFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: BpcElderlyCessationFamilyMemberIncomeTypeEnum | null;
  hasExpenseProofs?: boolean | null;
  bpcElderlyCessation: BpcElderlyCessationEntity;
  bpcElderlyCessationFamilyMemberDocument?:
    | BpcElderlyCessationFamilyMemberDocumentEntity[]
    | null;
}

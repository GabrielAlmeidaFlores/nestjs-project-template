import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import type { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import type { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';
import type { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';
import type { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';

export interface BpcDisabilityGrantFamilyMemberEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantFamilyMemberId> {
  fullName: string;
  birthDate: Date;
  kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;
  livesInSameResidence: boolean;
  hasIncome: boolean;
  monthlyIncomeAmount?: number | null;
  incomeType?: BpcDisabilityGrantFamilyMemberIncomeTypeEnum | null;
  hasExpenseProofs?: boolean | null;
  BpcDisabilityGrant: BpcDisabilityGrantEntity;
  BpcDisabilityGrantFamilyMemberDocument?:
    | BpcDisabilityGrantFamilyMemberDocumentEntity[]
    | null;
}

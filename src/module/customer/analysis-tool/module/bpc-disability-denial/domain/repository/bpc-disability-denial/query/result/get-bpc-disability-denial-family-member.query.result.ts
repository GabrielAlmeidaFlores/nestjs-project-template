import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityDenialFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/query/result/get-bpc-disability-denial-family-member-document.query.result';
import type { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import type { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';
import type { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';

export class GetBpcDisabilityDenialFamilyMemberQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialFamilyMemberId;
  public readonly fullName: string;
  public readonly birthDate: Date;
  public readonly kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;
  public readonly livesInSameResidence: boolean;
  public readonly hasIncome: boolean;
  public readonly monthlyIncomeAmount: number | null;
  public readonly incomeType: BpcDisabilityDenialFamilyMemberIncomeTypeEnum | null;
  public readonly hasExpenseProofs: boolean | null;
  public readonly bpcDisabilityDenialFamilyMemberDocument: GetBpcDisabilityDenialFamilyMemberDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialFamilyMemberQueryResult.name;
}

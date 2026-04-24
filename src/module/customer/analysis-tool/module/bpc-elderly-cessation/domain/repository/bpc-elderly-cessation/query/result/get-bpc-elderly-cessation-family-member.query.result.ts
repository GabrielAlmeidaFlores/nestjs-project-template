import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcElderlyCessationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/query/result/get-bpc-elderly-cessation-family-member-document.query.result';
import type { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import type { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';
import type { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';

export class GetBpcElderlyCessationFamilyMemberQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationFamilyMemberId;
  public readonly fullName: string;
  public readonly birthDate: Date;
  public readonly kinship: BpcElderlyCessationFamilyMemberKinshipEnum;
  public readonly livesInSameResidence: boolean;
  public readonly hasIncome: boolean;
  public readonly monthlyIncomeAmount: number | null;
  public readonly incomeType: BpcElderlyCessationFamilyMemberIncomeTypeEnum | null;
  public readonly hasExpenseProofs: boolean | null;
  public readonly bpcElderlyCessationFamilyMemberDocument: GetBpcElderlyCessationFamilyMemberDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationFamilyMemberQueryResult.name;
}

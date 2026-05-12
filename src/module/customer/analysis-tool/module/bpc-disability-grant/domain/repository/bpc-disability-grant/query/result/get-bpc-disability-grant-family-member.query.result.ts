import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityGrantFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/query/result/get-bpc-disability-grant-family-member-document.query.result';
import type { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import type { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';
import type { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';

export class GetBpcDisabilityGrantFamilyMemberQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantFamilyMemberId;
  public readonly fullName: string;
  public readonly birthDate: Date;
  public readonly kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;
  public readonly livesInSameResidence: boolean;
  public readonly hasIncome: boolean;
  public readonly monthlyIncomeAmount: number | null;
  public readonly incomeType: BpcDisabilityGrantFamilyMemberIncomeTypeEnum | null;
  public readonly hasExpenseProofs: boolean | null;
  public readonly BpcDisabilityGrantFamilyMemberDocument: GetBpcDisabilityGrantFamilyMemberDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantFamilyMemberQueryResult.name;
}

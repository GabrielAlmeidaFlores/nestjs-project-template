import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/query/result/get-bpc-disability-termination-family-member-document.query.result';
import type { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import type { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';
import type { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';

export class GetBpcDisabilityTerminationFamilyMemberQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationFamilyMemberId;
  public readonly fullName: string;
  public readonly birthDate: Date;
  public readonly kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;
  public readonly livesInSameResidence: boolean;
  public readonly hasIncome: boolean;
  public readonly monthlyIncomeAmount: number | null;
  public readonly incomeType: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum | null;
  public readonly hasExpenseProofs: boolean | null;
  public readonly bpcDisabilityTerminationFamilyMemberDocument: GetBpcDisabilityTerminationFamilyMemberDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationFamilyMemberQueryResult.name;
}

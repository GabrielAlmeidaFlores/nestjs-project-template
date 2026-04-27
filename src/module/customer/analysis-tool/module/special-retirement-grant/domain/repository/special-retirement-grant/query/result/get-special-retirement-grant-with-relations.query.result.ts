import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetSpecialRetirementGrantBenefitQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-benefit.query.result';
import type { GetSpecialRetirementGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-document.query.result';
import type { GetSpecialRetirementGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-legal-proceeding.query.result';
import type { GetSpecialRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/query/result/get-special-retirement-grant-result.query.result';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

export class GetSpecialRetirementGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantId;
  public readonly name: string;
  public readonly specialActivity: boolean;
  public readonly cnisDocument: string | null;
  public readonly specialRetirementGrantResult: GetSpecialRetirementGrantResultQueryResult | null;
  public readonly specialRetirementGrantLegalProceeding: GetSpecialRetirementGrantLegalProceedingQueryResult[];
  public readonly specialRetirementGrantBenefit: GetSpecialRetirementGrantBenefitQueryResult[];
  public readonly specialRetirementGrantDocument: GetSpecialRetirementGrantDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialRetirementGrantWithRelationsQueryResult.name;
}

import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAudienceQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-document.query.result';
import type { GetAudienceQuestionGeneratorResultQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/query/result/get-audience-question-generator-result.query.result';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';

export class GetAudienceQuestionGeneratorWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AudienceQuestionGeneratorId;
  public readonly audienceQuestionGeneratorResult: GetAudienceQuestionGeneratorResultQueryResult | null;
  public readonly audienceQuestionGeneratorDocument: GetAudienceQuestionGeneratorDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAudienceQuestionGeneratorWithRelationsQueryResult.name;
}

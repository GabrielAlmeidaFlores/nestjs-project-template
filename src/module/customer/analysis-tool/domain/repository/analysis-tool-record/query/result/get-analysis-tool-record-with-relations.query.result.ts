import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations.query.result';
import type { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { GetAdministrativeProcedureInssAnalysisQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis.query.result';
import type { GetCnisFastAnalysisQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis.query.result';

export class GetAnalysisToolRecordWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolRecordId;
  public readonly status: AnalysisStatusEnum;
  public readonly code: AnalysisToolRecordCode;
  public readonly type: AnalysisToolRecordTypeEnum;
  public readonly cnisFastAnalysis: GetCnisFastAnalysisQueryResult | null;
  public readonly retirementPlanningRpps: GetRetirementPlanningRppsQueryResult | null;
  public readonly administrativeProcedureInssAnalysis: GetAdministrativeProcedureInssAnalysisQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly retirementPlanningRgps: GetRetirementPlanningRgpsWithRelationsQueryResult | null;

  protected override readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResult.name;
}

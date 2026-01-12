import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export interface AnalysisToolRecordEntityPropsInterface extends BaseEntityPropsInterface<AnalysisToolRecordId> {
  code: AnalysisToolRecordCode;
  type: AnalysisToolRecordTypeEnum;
  cnisFastAnalysis?: CnisFastAnalysisEntity | null;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
  retirementPlanningRpps?: RetirementPlanningRppsEntity | null;
  status: AnalysisStatusEnum;
  analysisToolClient: AnalysisToolClientEntity;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

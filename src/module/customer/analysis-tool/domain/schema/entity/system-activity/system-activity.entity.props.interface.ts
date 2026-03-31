import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { SystemActivityId } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/value-object/system-activity-id/system-activity-id.value-object';

export interface SystemActivityEntityPropsInterface extends BaseEntityPropsInterface<SystemActivityId> {
  title: string;
  description: string;
  organizationMemberId?: OrganizationMemberId | null;
  analysisToolClientId?: AnalysisToolClientId | null;
  analysisToolRecordId?: AnalysisToolRecordId | null;
}

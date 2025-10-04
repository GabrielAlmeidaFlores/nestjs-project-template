import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export interface CnisFastAnalysisEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisId> {
  cnisDocument?: string | null;
  cnisFastAnalysisClient: AnalysisToolClientEntity;
  cnisFastAnalysisResult?: CnisFastAnalysisResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

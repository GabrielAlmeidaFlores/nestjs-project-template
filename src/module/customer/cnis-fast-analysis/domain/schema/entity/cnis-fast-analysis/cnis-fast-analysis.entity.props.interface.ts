import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export interface CnisFastAnalysisEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisId> {
  cnisDocument?: string | null;
  client: CnisFastAnalysisClientEntity;
  result?: CnisFastAnalysisResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}

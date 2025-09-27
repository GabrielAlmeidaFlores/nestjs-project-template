import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisStatusEnum } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/enum/cnis-fast-analysis-status.enum';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { CnisFastAnalysisEntityPropsInterface } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity.props.interface';
import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export class CnisFastAnalysisEntity extends BaseEntity<CnisFastAnalysisId> {
  public readonly status: CnisFastAnalysisStatusEnum;
  public readonly cnisDocument: string | null;
  public readonly client: CnisFastAnalysisClientEntity;
  public readonly result: CnisFastAnalysisResultEntity | null;
  public readonly createdBy: OrganizationMemberId;
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = CnisFastAnalysisEntity.name;

  public constructor(props: CnisFastAnalysisEntityPropsInterface) {
    super(CnisFastAnalysisId, props);

    this.status =
      props.result === null
        ? CnisFastAnalysisStatusEnum.IN_PROGRESS
        : CnisFastAnalysisStatusEnum.COMPLETED;
    this.cnisDocument = props.cnisDocument ?? null;
    this.result = props.result ?? null;
    this.client = props.client;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}

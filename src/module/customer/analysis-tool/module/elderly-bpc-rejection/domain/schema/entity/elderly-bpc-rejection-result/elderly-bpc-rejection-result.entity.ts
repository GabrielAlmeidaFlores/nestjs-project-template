import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity.props.interface';

export class ElderlyBpcRejectionResultEntity extends BaseEntity<ElderlyBpcRejectionResultId> {
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected readonly _type = ElderlyBpcRejectionResultEntity.name;

  public constructor(props: ElderlyBpcRejectionResultEntityPropsInterface) {
    super(ElderlyBpcRejectionResultId, props);
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.elderlyBpcRejectionId = props.elderlyBpcRejectionId;
  }
}

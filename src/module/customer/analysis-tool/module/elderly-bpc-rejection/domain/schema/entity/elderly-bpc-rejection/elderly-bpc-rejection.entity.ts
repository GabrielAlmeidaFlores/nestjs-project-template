import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';

import type { ElderlyBpcRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity.props.interface';
import type { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import type { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';
import type { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

export class ElderlyBpcRejectionEntity extends BaseEntity<ElderlyBpcRejectionId> {
  public readonly analysisName: string | null;
  public readonly category: ElderlyBpcRejectionCategoryEnum | null;
  public readonly maritalStatus: ElderlyBpcRejectionMaritalStatusEnum | null;
  public readonly applicantLivesAlone: boolean | null;
  public readonly elderlyBpcRejectionResultId: ElderlyBpcRejectionResultId | null;

  protected readonly _type = ElderlyBpcRejectionEntity.name;

  public constructor(props: ElderlyBpcRejectionEntityPropsInterface) {
    super(ElderlyBpcRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.maritalStatus = props.maritalStatus ?? null;
    this.applicantLivesAlone = props.applicantLivesAlone ?? null;
    this.elderlyBpcRejectionResultId =
      props.elderlyBpcRejectionResultId ?? null;
  }
}

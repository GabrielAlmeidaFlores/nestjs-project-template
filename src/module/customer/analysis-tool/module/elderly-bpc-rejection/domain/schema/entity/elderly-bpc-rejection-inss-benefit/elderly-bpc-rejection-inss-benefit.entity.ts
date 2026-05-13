import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionInssBenefitId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/value-object/elderly-bpc-rejection-inss-benefit-id/elderly-bpc-rejection-inss-benefit-id.value-object';

import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity.props.interface';

export class ElderlyBpcRejectionInssBenefitEntity extends BaseEntity<ElderlyBpcRejectionInssBenefitId> {
  public readonly inssBenefit: string | null;
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected readonly _type = ElderlyBpcRejectionInssBenefitEntity.name;

  public constructor(
    props: ElderlyBpcRejectionInssBenefitEntityPropsInterface,
  ) {
    super(ElderlyBpcRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit ?? null;
    this.elderlyBpcRejectionId = props.elderlyBpcRejectionId;
  }
}

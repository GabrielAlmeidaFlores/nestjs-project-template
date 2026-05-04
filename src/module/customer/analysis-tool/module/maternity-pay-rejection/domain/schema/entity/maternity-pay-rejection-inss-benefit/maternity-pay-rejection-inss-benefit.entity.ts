import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/value-object/maternity-pay-rejection-inss-benefit-id.value-object';

import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity.props.interface';

export class MaternityPayRejectionInssBenefitEntity extends BaseEntity<MaternityPayRejectionInssBenefitId> {
  public readonly inssBenefit: string | null;
  public readonly maternityPayRejectionId: MaternityPayRejectionId | null;

  protected readonly _type = MaternityPayRejectionInssBenefitEntity.name;

  public constructor(
    props: MaternityPayRejectionInssBenefitEntityPropsInterface,
  ) {
    super(MaternityPayRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit ?? null;
    this.maternityPayRejectionId = props.maternityPayRejectionId ?? null;
  }
}

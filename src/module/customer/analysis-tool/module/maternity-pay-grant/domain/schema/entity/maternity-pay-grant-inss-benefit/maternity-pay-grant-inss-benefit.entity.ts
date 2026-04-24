import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/value-object/maternity-pay-grant-inss-benefit-id.value-object';

import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity.props.interface';

export class MaternityPayGrantInssBenefitEntity extends BaseEntity<MaternityPayGrantInssBenefitId> {
  public readonly inssBenefitNumber: string;
  public readonly maternityPayGrantId: MaternityPayGrantId;

  protected readonly _type = MaternityPayGrantInssBenefitEntity.name;

  public constructor(props: MaternityPayGrantInssBenefitEntityPropsInterface) {
    super(MaternityPayGrantInssBenefitId, props);
    this.inssBenefitNumber = props.inssBenefitNumber;
    this.maternityPayGrantId = props.maternityPayGrantId;
  }
}

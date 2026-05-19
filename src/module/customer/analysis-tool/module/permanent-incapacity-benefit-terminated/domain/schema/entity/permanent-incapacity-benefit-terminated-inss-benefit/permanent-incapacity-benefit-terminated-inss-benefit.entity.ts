import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/value-object/permanent-incapacity-benefit-terminated-inss-benefit-id.value-object';

import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedInssBenefitEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInssBenefitEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedInssBenefitEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.permanentIncapacityBenefitTerminatedId =
      props.permanentIncapacityBenefitTerminatedId;
  }
}

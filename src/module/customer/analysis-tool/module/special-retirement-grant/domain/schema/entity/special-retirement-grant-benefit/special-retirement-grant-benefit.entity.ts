import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity.props.interface';
import { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantBenefitEntity extends BaseEntity<SpecialRetirementGrantBenefitId> {
  @Description('Número do benefício no INSS.')
  public readonly inssBenefitNumber: string;

  protected readonly _type = SpecialRetirementGrantBenefitEntity.name;

  public constructor(props: SpecialRetirementGrantBenefitEntityPropsInterface) {
    super(SpecialRetirementGrantBenefitId, props);
    this.inssBenefitNumber = props.inssBenefitNumber;
  }
}

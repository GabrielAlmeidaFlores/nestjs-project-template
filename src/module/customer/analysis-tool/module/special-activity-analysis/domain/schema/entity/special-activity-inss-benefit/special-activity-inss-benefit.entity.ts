import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit-entity.props.interface';
import { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialActivityInssBenefitEntity extends BaseEntity<SpecialActivityInssBenefitId> {
  @Description('Número do benefício INSS')
  public readonly inssBenefitNumber: string;

  @Description('Atividade especial relacionada')
  public readonly specialActivity: SpecialActivityEntity;

  protected readonly _type = SpecialActivityInssBenefitEntity.name;

  public constructor(props: SpecialActivityInssBenefitEntityPropsInterface) {
    super(SpecialActivityInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.specialActivity = props.specialActivity;
  }
}

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity.props.interface';
import { RetirementPlanningRgpsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/value-object/retirement-planning-rgps-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsInssBenefitEntity extends BaseEntity<RetirementPlanningRgpsInssBenefitId> {
  @Description(
    'Número do benefício INSS associado ao planejamento de aposentadoria RGPS.',
  )
  public readonly inssBenefitNumber: string;

  @Description(
    'Planejamento de aposentadoria RGPS associado ao benefício INSS.',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity;

  protected readonly _type = RetirementPlanningRgpsInssBenefitEntity.name;

  public constructor(
    props: RetirementPlanningRgpsInssBenefitEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.retirementPlanningRgps = props.retirementPlanningRgps;
  }
}

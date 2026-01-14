import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity.props.interface';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsInssBenefitEntity extends BaseEntity<RetirementPlanningRppsInssBenefitId> {
  @Description('Número do benefício INSS associado ao RPPS.')
  public readonly inssBenefitNumber: string;

  @Description('RPPS associado ao benefício INSS.')
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity;

  protected readonly _type = RetirementPlanningRppsInssBenefitEntity.name;

  public constructor(
    props: RetirementPlanningRppsInssBenefitEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.retirementPlanningRpps = props.retirementPlanningRpps;
  }
}

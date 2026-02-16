import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.entity.props.interface';
import { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsLegalProceedingEntity extends BaseEntity<RetirementPlanningRppsLegalProceedingId> {
  @Description('Número do processo legal associado ao RPPS.')
  public readonly legalProceeding: string;

  @Description('RPPS associado ao processo legal.')
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity;

  protected readonly _type = RetirementPlanningRppsLegalProceedingEntity.name;

  public constructor(
    props: RetirementPlanningRppsLegalProceedingEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsLegalProceedingId, props);

    this.legalProceeding = props.legalProceeding;
    this.retirementPlanningRpps = props.retirementPlanningRpps;
  }
}

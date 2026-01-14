import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity.props.interface';
import { RetirementPlanningRgpsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/value-object/retirement-planning-rgps-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsLegalProceedingEntity extends BaseEntity<RetirementPlanningRgpsLegalProceedingId> {
  @Description(
    'Número do processo judicial relacionado ao planejamento de aposentadoria RGPS.',
  )
  public readonly legalProceedingNumber: string;

  @Description(
    'Planejamento de aposentadoria RGPS associado ao processo judicial.',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity;

  protected readonly _type = RetirementPlanningRgpsLegalProceedingEntity.name;

  public constructor(
    props: RetirementPlanningRgpsLegalProceedingEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.retirementPlanningRgps = props.retirementPlanningRgps;
  }
}

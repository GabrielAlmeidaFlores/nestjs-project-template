import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import type { RetirementPlanningRgpsEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity.props.interface';

export class RetirementPlanningRgpsEntity extends BaseEntity<RetirementPlanningRgpsId> {
  @Description(
    'Documento CNIS utilizado na análise de planejamento de aposentadoria RGPS.',
  )
  public readonly cnisDocument: string | null;

  @Description('Resultado da análise de planejamento de aposentadoria RGPS.')
  public readonly retirementPlanningRgpsResult: RetirementPlanningRgpsResultEntity | null;

  protected readonly _type = RetirementPlanningRgpsEntity.name;
  public constructor(props: RetirementPlanningRgpsEntityPropsInterface) {
    super(RetirementPlanningRgpsId, props);

    this.cnisDocument = props.cnisDocument ?? null;
    this.retirementPlanningRgpsResult =
      props.retirementPlanningRgpsResult ?? null;
  }
}

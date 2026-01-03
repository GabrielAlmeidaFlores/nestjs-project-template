import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

export class ListRetirementPlanningRgpsPeriodQueryParam extends ListDataInputModel {
  public retirementPlanningRgps?: RetirementPlanningRgpsId | undefined;

  protected override readonly _type =
    ListRetirementPlanningRgpsPeriodQueryParam.name;

  public constructor(
    props: Partial<ListRetirementPlanningRgpsPeriodQueryParam> = {},
  ) {
    super(props);
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? undefined;
  }
}

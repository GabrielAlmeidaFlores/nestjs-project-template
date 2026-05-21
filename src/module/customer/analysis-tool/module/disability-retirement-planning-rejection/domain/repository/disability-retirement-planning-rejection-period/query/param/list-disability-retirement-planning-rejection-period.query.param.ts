import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';

export class ListDisabilityRetirementPlanningRejectionPeriodQueryParam extends ListDataInputModel {
  public disabilityRetirementPlanningRejection?:
    | DisabilityRetirementPlanningRejectionId
    | undefined;

  protected override readonly _type =
    ListDisabilityRetirementPlanningRejectionPeriodQueryParam.name;

  public constructor(
    props: Partial<ListDisabilityRetirementPlanningRejectionPeriodQueryParam> = {},
  ) {
    super(props);
    this.disabilityRetirementPlanningRejection =
      props.disabilityRetirementPlanningRejection ?? undefined;
  }
}

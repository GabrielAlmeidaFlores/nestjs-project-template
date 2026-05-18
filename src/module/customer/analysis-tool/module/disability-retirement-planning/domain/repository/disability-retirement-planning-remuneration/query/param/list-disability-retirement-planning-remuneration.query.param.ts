import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListDisabilityRetirementPlanningRemunerationQueryParam extends ListDataInputModel {
  protected override readonly _type =
    ListDisabilityRetirementPlanningRemunerationQueryParam.name;

  public constructor(
    props: Partial<ListDisabilityRetirementPlanningRemunerationQueryParam>,
  ) {
    super(props);
  }
}

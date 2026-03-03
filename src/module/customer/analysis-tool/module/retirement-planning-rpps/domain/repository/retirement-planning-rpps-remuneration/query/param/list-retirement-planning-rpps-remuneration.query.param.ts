import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListRetirementPlanningRppsRemunerationQueryParam extends ListDataInputModel {
  protected override readonly _type =
    ListRetirementPlanningRppsRemunerationQueryParam.name;

  public constructor(
    props: Partial<ListRetirementPlanningRppsRemunerationQueryParam>,
  ) {
    super(props);
  }
}

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListTeacherRetirementPlanningRppsRemunerationQueryParam extends ListDataInputModel {
  protected override readonly _type =
    ListTeacherRetirementPlanningRppsRemunerationQueryParam.name;

  public constructor(
    props: Partial<ListTeacherRetirementPlanningRppsRemunerationQueryParam>,
  ) {
    super(props);
  }
}

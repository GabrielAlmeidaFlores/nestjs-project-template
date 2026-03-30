import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListTeacherRetirementPlanningRemunerationQueryParam extends ListDataInputModel {
  protected override readonly _type =
    ListTeacherRetirementPlanningRemunerationQueryParam.name;

  public constructor(
    props: Partial<ListTeacherRetirementPlanningRemunerationQueryParam>,
  ) {
    super(props);
  }
}

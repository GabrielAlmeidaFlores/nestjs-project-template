import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListGeneralUrbanRetirementAnalysisRemunerationQueryParam extends ListDataInputModel {
  protected override readonly _type =
    ListGeneralUrbanRetirementAnalysisRemunerationQueryParam.name;

  public constructor(
    props: Partial<ListGeneralUrbanRetirementAnalysisRemunerationQueryParam>,
  ) {
    super(props);
  }
}

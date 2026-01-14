import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListLegalPleadingHistoryQueryParam extends ListDataInputModel {
  protected override readonly _type = ListLegalPleadingHistoryQueryParam.name;

  public constructor(props: Partial<ListLegalPleadingHistoryQueryParam>) {
    super(props);
  }
}

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListRegulatoryUpdatesQueryParam extends ListDataInputModel {
  public readonly searchBy: string | null;
  public readonly dateFrom: Date | null;
  public readonly dateTo: Date | null;

  protected override readonly _type = ListRegulatoryUpdatesQueryParam.name;

  public constructor(props: Partial<ListRegulatoryUpdatesQueryParam> = {}) {
    super(props);
    this.searchBy = props.searchBy ?? null;
    this.dateFrom = props.dateFrom ?? null;
    this.dateTo = props.dateTo ?? null;
  }
}

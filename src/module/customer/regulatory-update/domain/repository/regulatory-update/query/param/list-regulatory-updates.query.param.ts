import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListRegulatoryUpdatesQueryParam extends ListDataInputModel {
  public readonly searchBy: string | null;
  public readonly dateStart: Date | null;
  public readonly dateEnd: Date | null;

  protected override readonly _type = ListRegulatoryUpdatesQueryParam.name;

  public constructor(props: Partial<ListRegulatoryUpdatesQueryParam> = {}) {
    super(props);
    this.searchBy = props.searchBy ?? null;
    this.dateStart = props.dateStart ?? null;
    this.dateEnd = props.dateEnd ?? null;
  }
}

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListAffiliateCustomersQueryParam extends ListDataInputModel {
  protected override readonly _type = ListAffiliateCustomersQueryParam.name;

  public constructor(props: Partial<ListAffiliateCustomersQueryParam>) {
    super(props);
  }
}

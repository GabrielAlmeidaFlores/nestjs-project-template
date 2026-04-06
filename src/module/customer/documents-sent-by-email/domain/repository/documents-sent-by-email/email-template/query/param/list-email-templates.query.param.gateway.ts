import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListEmailTemplatesQueryParamGateway extends ListDataInputModel {
  protected override readonly _type = ListEmailTemplatesQueryParamGateway.name;

  public constructor(props: Partial<ListDataInputModel>) {
    super(props);
  }
}

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListOrganizationMembersInputModel extends ListDataInputModel {
  public searchBy: string | null;

  protected override readonly _type = ListOrganizationMembersInputModel.name;

  public constructor(props: Partial<ListOrganizationMembersInputModel>) {
    super(props);
    this.searchBy = props.searchBy ?? null;
  }
}

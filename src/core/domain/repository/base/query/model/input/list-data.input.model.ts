export class ListDataInputModel {
  public page: number;
  public limit: number;
  public sortField: string | null;
  public field: string | null;
  public search: string | null;

  protected readonly _type = ListDataInputModel.name;

  public constructor(props: Partial<ListDataInputModel>) {
    const defaultPage = 1;
    const defaultLimit = 10;

    this.page = props.page && props.page > 0 ? props.page : defaultPage;
    this.limit = props.limit && props.limit > 0 ? props.limit : defaultLimit;
    this.sortField = props.sortField ?? null;
    this.field = props.field ?? null;
    this.search = props.search ?? null;
  }
}

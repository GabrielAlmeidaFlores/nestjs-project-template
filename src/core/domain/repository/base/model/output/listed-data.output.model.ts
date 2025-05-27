export class ListedDataOutputModel<T> {
  public page: number;
  public limit: number;
  public totalItems: number;
  public totalPages: number;
  public amountItemsCurrentPage: number;
  public resource: T[];

  protected readonly _type = ListedDataOutputModel.name;

  public constructor(props: {
    page: number;
    limit: number;
    totalItems: number;
    resource: T[];
  }) {
    const defaultMinTotalPages = 0;
    const totalPagesEstimate = props.totalItems / props.limit;

    this.page = props.page;
    this.limit = props.limit;
    this.totalItems = props.totalItems;
    this.totalPages = Math.ceil(totalPagesEstimate);
    this.totalPages = this.totalPages ? this.totalPages : defaultMinTotalPages;
    this.amountItemsCurrentPage = props.resource.length;
    this.resource = this.resource;
  }
}

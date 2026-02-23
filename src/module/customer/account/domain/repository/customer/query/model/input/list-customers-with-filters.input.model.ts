import type { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';

export interface ListCustomersWithFiltersInputModelPropsInterface {
  page: number;
  limit: number;
  searchBy?: string | undefined;
  type?: CustomerTypeEnum | undefined;
  sortField?: string | undefined;
}

export class ListCustomersWithFiltersInputModel {
  public readonly page: number;
  public readonly limit: number;
  public readonly searchBy?: string | undefined;
  public readonly type?: CustomerTypeEnum | undefined;
  public readonly sortField?: string | undefined;

  protected readonly _type = ListCustomersWithFiltersInputModel.name;

  public constructor(props: ListCustomersWithFiltersInputModelPropsInterface) {
    this.page = props.page;
    this.limit = props.limit;
    this.searchBy = props.searchBy;
    this.type = props.type;
    this.sortField = props.sortField;
  }
}

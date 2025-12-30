import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export class ListLegalProceedingDetailByLegalProceedingNumberQueryParam extends ListDataInputModel {
  public readonly legalProceedingNumber: string | null;

  protected override readonly _type =
    ListLegalProceedingDetailByLegalProceedingNumberQueryParam.name;

  public constructor(
    props: Partial<ListLegalProceedingDetailByLegalProceedingNumberQueryParam>,
  ) {
    super(props);

    this.legalProceedingNumber = props.legalProceedingNumber ?? null;
  }
}

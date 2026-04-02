import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

export interface ListDocumentsSentByEmailQueryParamGatewayPropsInterface {
  startDate: Date | null;
  endDate: Date | null;
}

export class ListDocumentsSentByEmailQueryParamGateway extends ListDataInputModel {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;

  protected override readonly _type =
    ListDocumentsSentByEmailQueryParamGateway.name;

  public constructor(
    props: Partial<ListDocumentsSentByEmailQueryParamGateway> & {
      startDate?: Date | null;
      endDate?: Date | null;
    },
  ) {
    super(props);

    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
  }
}

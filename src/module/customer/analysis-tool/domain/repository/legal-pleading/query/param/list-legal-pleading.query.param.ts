import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';

export class ListLegalPleadingQueryParam extends ListDataInputModel {
  public searchBy: string | null;
  public status: AnalysisStatusEnum | null;

  protected override readonly _type = ListLegalPleadingQueryParam.name;

  public constructor(props: Partial<ListLegalPleadingQueryParam>) {
    super(props);

    this.searchBy = props.searchBy ?? null;
    this.status = props.status ?? null;
  }
}

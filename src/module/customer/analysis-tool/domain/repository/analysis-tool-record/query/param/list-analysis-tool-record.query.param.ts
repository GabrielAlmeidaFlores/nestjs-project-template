import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { DeepPartialType } from '@shared/system/type/deep-partial.type';

export class ListAnalysisToolRecordQueryParam extends ListDataInputModel {
  public readonly type: AnalysisToolRecordTypeEnum | null;
  public readonly searchBy: string | null;

  protected override readonly _type = ListAnalysisToolRecordQueryParam.name;

  public constructor(props: DeepPartialType<ListAnalysisToolRecordQueryParam>) {
    super(props);

    this.type = props.type ?? null;
    this.searchBy = props.searchBy ?? null;
  }
}

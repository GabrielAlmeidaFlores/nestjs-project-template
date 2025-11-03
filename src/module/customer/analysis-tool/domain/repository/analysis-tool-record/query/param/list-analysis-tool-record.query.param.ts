import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

export class ListAnalysisToolRecordQueryParam extends ListDataInputModel {
  public readonly type: AnalysisToolRecordTypeEnum | null;
  public readonly searchBy: string | null;
  public readonly analysisToolClientId: AnalysisToolClientId | null;

  protected override readonly _type = ListAnalysisToolRecordQueryParam.name;

  public constructor(props: Partial<ListAnalysisToolRecordQueryParam>) {
    super(props);

    this.type = props.type ?? null;
    this.searchBy = props.searchBy ?? null;
    this.analysisToolClientId = props.analysisToolClientId ?? null;
  }
}

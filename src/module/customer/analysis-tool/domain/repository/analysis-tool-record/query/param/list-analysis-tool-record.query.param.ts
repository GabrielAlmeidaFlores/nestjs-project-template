import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

export class ListAnalysisToolRecordQueryParam extends ListDataInputModel {
  public readonly type: AnalysisToolRecordTypeEnum | null;
  public readonly clientName: string | null;
  public readonly code: string | null;

  protected override readonly _type = ListAnalysisToolRecordQueryParam.name;
}

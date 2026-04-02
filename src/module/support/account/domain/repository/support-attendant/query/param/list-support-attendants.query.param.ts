import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class ListSupportAttendantsQueryParam extends ListDataInputModel {
  public readonly supportType: SupportTypeEnum | null;

  protected override readonly _type = ListSupportAttendantsQueryParam.name;

  public constructor(props: Partial<ListSupportAttendantsQueryParam> = {}) {
    super(props);
    this.supportType = props.supportType ?? null;
  }
}

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';

export class ListSupportAttendantsQueryParam extends ListDataInputModel {
  public readonly supportType: SupportTypeEnum | null;
  public override readonly search: string | null;

  protected override readonly _type = ListSupportAttendantsQueryParam.name;

  public constructor(props: Partial<ListSupportAttendantsQueryParam> = {}) {
    super(props);
    this.supportType = props.supportType ?? null;
    this.search = props.search ?? null;
  }
}

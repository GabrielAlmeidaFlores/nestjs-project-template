import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';

export class ListAffiliateTransfersQueryParam extends ListDataInputModel {
  public readonly from: Date | null;
  public readonly to: Date | null;
  public readonly status: TransferStatusEnum | null;

  protected override readonly _type = ListAffiliateTransfersQueryParam.name;

  public constructor(props: Partial<ListAffiliateTransfersQueryParam> = {}) {
    super(props);
    this.from = props.from ?? null;
    this.to = props.to ?? null;
    this.status = props.status ?? null;
  }
}

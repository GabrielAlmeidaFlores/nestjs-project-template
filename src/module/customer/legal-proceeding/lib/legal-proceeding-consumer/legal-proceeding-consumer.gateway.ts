import { Injectable } from '@nestjs/common';

import type { LegalProceedingStatusEnum } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/enum/legal-proceeding-status.enum';
import type { LegalProceedingDataOutputModel } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/model/output/legal-proceeding-data.output.model';

@Injectable()
export abstract class LegalProceedingConsumerGateway {
  public abstract consumeByProcessNumber(
    legalProceedingNumber: string,
  ): Promise<object>;

  public abstract extractLegalProceedingData(
    detailJson: string,
  ): LegalProceedingDataOutputModel;

  public abstract extractLastItemStatus(
    detailJson: string,
  ): LegalProceedingStatusEnum | null;
}

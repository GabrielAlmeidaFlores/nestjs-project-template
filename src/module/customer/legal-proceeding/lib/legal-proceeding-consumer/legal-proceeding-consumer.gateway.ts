import { Injectable } from '@nestjs/common';
@Injectable()
export abstract class LegalProceedingConsumerGateway {
  public abstract consumeByProcessNumber(
    legalProceedingNumber: string,
  ): Promise<object>;
}

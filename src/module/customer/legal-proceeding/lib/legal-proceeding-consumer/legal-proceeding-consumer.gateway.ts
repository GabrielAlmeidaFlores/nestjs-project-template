import { Injectable } from '@nestjs/common';

import { ComunicacaoPjeService } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/comunicacao-pje/comunicacao-pje.service';

@Injectable()
export class LegalProceedingConsumerGateway {
  protected readonly _type = LegalProceedingConsumerGateway.name;

  public constructor(
    private readonly comunicacaoPjeService: ComunicacaoPjeService,
  ) {}

  public async consumeByProcessNumber(
    legalProceedingNumber: string,
  ): Promise<object> {
    const response = await this.comunicacaoPjeService.getLegalProceeding(
      legalProceedingNumber,
    );

    return response;
  }
}

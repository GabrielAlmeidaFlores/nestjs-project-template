import { Module } from '@nestjs/common';

import { ComunicacaoPjeModule } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/comunicacao-pje/comunicacao-pje.module';
import { ComunicacaoPjeService } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/comunicacao-pje/comunicacao-pje.service';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';

@Module({
  imports: [ComunicacaoPjeModule],
  providers: [
    {
      provide: LegalProceedingConsumerGateway,
      useExisting: ComunicacaoPjeService,
    },
  ],
  exports: [LegalProceedingConsumerGateway],
})
export class LegalProceedingConsumerModule {
  protected readonly _type = LegalProceedingConsumerModule.name;
}

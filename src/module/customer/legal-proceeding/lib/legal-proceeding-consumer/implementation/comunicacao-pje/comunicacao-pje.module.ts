import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ComunicacaoPjeService } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/implementation/comunicacao-pje/comunicacao-pje.service';

@Module({
  imports: [HttpModule],
  providers: [ComunicacaoPjeService],
  exports: [ComunicacaoPjeService],
})
export class ComunicacaoPjeModule {
  protected readonly _type = ComunicacaoPjeModule.name;
}

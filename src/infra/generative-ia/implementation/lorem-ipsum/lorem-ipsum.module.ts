import { Module } from '@nestjs/common';

import { LoremIpsumService } from '@infra/generative-ia/implementation/lorem-ipsum/lorem-ipsum.service';

@Module({
  providers: [LoremIpsumService],
  exports: [LoremIpsumService],
})
export class LoremIpsumModule {
  protected readonly _type = LoremIpsumModule.name;
}

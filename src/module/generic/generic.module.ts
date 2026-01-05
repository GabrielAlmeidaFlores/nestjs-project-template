import { Module } from '@nestjs/common';

import { AiConversationModule } from '@module/generic/ai-conversation/ai-conversation.module';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';
import { BankModule } from '@module/generic/bank/bank.module';

@Module({
  imports: [AuthIdentityModule, BankModule, AiConversationModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}

import { Module } from '@nestjs/common';

import { ModelContextProtocolService } from '@module/ai/mcp/lib/mcp-client/implementation/model-context-protocol/model-context-protocol.service';

@Module({
  providers: [ModelContextProtocolService],
  exports: [ModelContextProtocolService],
})
export class ModelContextProtocolModule {
  protected readonly _type = ModelContextProtocolModule.name;
}

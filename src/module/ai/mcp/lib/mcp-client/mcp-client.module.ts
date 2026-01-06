import { Module } from '@nestjs/common';

import { ModelContextProtocolModule } from '@module/ai/mcp/lib/mcp-client/implementation/model-context-protocol/model-context-protocol.module';
import { ModelContextProtocolService } from '@module/ai/mcp/lib/mcp-client/implementation/model-context-protocol/model-context-protocol.service';
import { McpClientGateway } from '@module/ai/mcp/lib/mcp-client/mcp-client.gateway';

@Module({
  imports: [ModelContextProtocolModule],
  providers: [
    {
      provide: McpClientGateway,
      useClass: ModelContextProtocolService,
    },
    ModelContextProtocolService,
  ],
  exports: [McpClientGateway],
})
export class McpClientModule {
  protected readonly _type = McpClientModule.name;
}

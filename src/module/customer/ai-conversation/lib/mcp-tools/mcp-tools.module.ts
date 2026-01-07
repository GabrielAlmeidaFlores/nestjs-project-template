import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { McpToolsGateway } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.gateway';
import { McpToolsService } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: McpToolsGateway,
      useClass: McpToolsService,
    },
  ],
  exports: [McpToolsGateway],
})
export class McpToolsModule {
  protected readonly _type = McpToolsModule.name;
}

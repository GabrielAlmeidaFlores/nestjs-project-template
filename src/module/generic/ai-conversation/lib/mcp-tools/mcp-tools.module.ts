import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { McpToolsService } from '@module/generic/ai-conversation/lib/mcp-tools/mcp-tools.service';

@Module({
  imports: [HttpModule],
  providers: [McpToolsService],
  exports: [McpToolsService],
})
export class McpToolsModule {
  protected readonly _type = McpToolsModule.name;
}

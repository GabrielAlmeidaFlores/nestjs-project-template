import { Module } from '@nestjs/common';

import { McpClientModule } from '@module/ai/mcp/lib/mcp-client/mcp-client.module';
import { McpAuthContextUseCase } from '@module/ai/mcp/use-case/extract-tokens.use-case';
import { McpUseCase } from '@module/ai/mcp/use-case/mcp.use-case';

@Module({
  imports: [McpClientModule],
  providers: [McpAuthContextUseCase, McpUseCase],
  exports: [McpUseCase],
})
export class McpModule {
  protected readonly _type = McpModule.name;
}

import { Module } from '@nestjs/common';

import { McpClientProvider } from '@module/ai/infra/mcp/lib/mcp.client';
import { McpAuthContextUseCase } from '@module/ai/infra/mcp/use-case/extract-tokens.use-case';
import { McpUseCase } from '@module/ai/infra/mcp/use-case/mcp.use-case';

@Module({
  providers: [McpClientProvider, McpAuthContextUseCase, McpUseCase],
  exports: [McpUseCase],
})
export class McpModule {
  protected readonly _type = McpModule.name;
}

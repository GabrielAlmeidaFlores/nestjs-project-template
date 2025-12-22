import { Module } from '@nestjs/common';

import { McpUseCase } from '@module/ai/mcp/use-case/mcp.use-case';

@Module({
  providers: [McpUseCase],
  exports: [McpUseCase],
})
export class McpModule {
  protected readonly _type = McpModule.name;
}

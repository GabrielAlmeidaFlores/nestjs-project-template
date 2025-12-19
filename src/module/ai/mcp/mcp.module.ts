import { Module } from '@nestjs/common';

import { McpController } from '@module/ai/mcp/mcp.controller';
import { McpUseCase } from '@module/ai/mcp/use-case/mcp.use-case';

@Module({
  providers: [McpUseCase],
  controllers: [McpController],
  exports: [McpUseCase],
})
export class McpModule {
  protected readonly _type = McpModule.name;
}

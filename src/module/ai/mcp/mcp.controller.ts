import { Controller, Get, Query } from '@nestjs/common';

import { McpUseCase } from '@module/ai/mcp/use-case/mcp.use-case';

@Controller('ai')
export class McpController {
  protected readonly _type = McpController.name;

  public constructor(private readonly mcp: McpUseCase) {}

  @Get('tools')
  public listTools(): ReturnType<McpUseCase['listTools']> {
    return this.mcp.listTools();
  }

  @Get('pje')
  public consultarPje(
    @Query('numeroProcesso') numeroProcesso: string,
  ): ReturnType<McpUseCase['consultarPje']> {
    return this.mcp.consultarPje(numeroProcesso);
  }

  @Get('db')
  public consultarUsuarios(): ReturnType<McpUseCase['consultarUsuarios']> {
    return this.mcp.consultarUsuarios();
  }
}

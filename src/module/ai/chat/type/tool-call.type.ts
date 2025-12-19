import type { JsonObjectInterface } from '@module/ai/mcp/use-case/mcp.use-case';

export interface ToolCallInterface {
  tool: string;
  arguments: JsonObjectInterface;
}

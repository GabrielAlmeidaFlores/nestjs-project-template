export type ToolHandlerType = (
  parameters: Record<string, unknown>,
) => Promise<unknown>;

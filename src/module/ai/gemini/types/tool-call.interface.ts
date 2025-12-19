export interface ConsultarPjeToolCallInterface {
  tool: 'consultar_pje';
  arguments: {
    numeroProcesso: string;
  };
}

export interface ConsultarUsuariosToolCallInterface {
  tool: 'consultar_usuarios';
  arguments: Record<string, never>;
}

export type AiToolCallType =
  | ConsultarPjeToolCallInterface
  | ConsultarUsuariosToolCallInterface;

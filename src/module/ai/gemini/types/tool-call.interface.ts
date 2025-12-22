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

export interface AiTextContentInterface {
  type: 'text';
  text: string;
}

export interface AiResponseInterface {
  content: AiTextContentInterface[];
  isError?: boolean;
}

export type AiToolCallType =
  | ConsultarPjeToolCallInterface
  | ConsultarUsuariosToolCallInterface;

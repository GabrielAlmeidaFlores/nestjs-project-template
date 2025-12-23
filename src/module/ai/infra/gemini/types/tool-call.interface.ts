import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

export interface ConsultarPjeToolCallInterface {
  tool: 'consultar_pje';
  arguments: {
    numeroProcesso: string;
  };
}

export interface LegalPleadingListToolCallInterface {
  tool: 'legal_pleading_list';
  arguments: {
    page: number;
    limit: number;
    search: string;
    sortField: string;
    field: string;
    status: string;
    searchBy: string;
  };
}

export interface LegalPleadingGetToolCallInterface {
  tool: 'legal_pleading_get';
  arguments: {
    legalPleadingId: LegalPleadingId;
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
  | LegalPleadingGetToolCallInterface
  | LegalPleadingListToolCallInterface
  | ConsultarUsuariosToolCallInterface;

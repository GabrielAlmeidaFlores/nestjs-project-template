export interface ComunicacaoPjeLegalProceedingItemOptional {
  id?: number;
  data_disponibilizacao?: string | null;
  siglaTribunal?: string | null;
  tipoComunicacao?: string | null;
  nomeOrgao?: string | null;
  idOrgao?: number | null;
  texto?: string | null;
  numero_processo?: string | null;
  meio?: string | null;
  link?: string | null;
  tipoDocumento?: string | null;
  nomeClasse?: string | null;
  codigoClasse?: string | null;
  numeroComunicacao?: number | null;
  ativo?: boolean | null;
  hash?: string | null;
  status?: string | null;
  motivo_cancelamento?: string | null;
  data_cancelamento?: string | null;
  datadisponibilizacao?: string | null;
  meiocompleto?: string | null;
  numeroprocessocommascara?: string | null;
  destinatarios?: Array<{
    comunicacao_id?: number;
    nome?: string | null;
    polo?: string | null;
  }> | null;
  destinatarioadvogados?: Array<Record<string, unknown>> | null;
}

export interface ComunicacaoPjeLegalProceedingResponseOptional {
  status?: string | null;
  message?: string | null;
  count?: number | null;
  items?: ComunicacaoPjeLegalProceedingItemOptional[] | null;
}

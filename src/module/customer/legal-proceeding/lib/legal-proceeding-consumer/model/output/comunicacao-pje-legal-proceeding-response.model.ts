export interface ApiResponseInterface {
  status?: string | undefined;
  message?: string | undefined;
  count?: number | undefined;
  items?: ItemInterface[] | undefined;
}

export interface ItemInterface {
  id?: number | undefined;
  data_disponibilizacao?: string | undefined;
  siglaTribunal?: string | undefined;
  tipoComunicacao?: string | undefined;
  nomeOrgao?: string | undefined;
  idOrgao?: number | undefined;
  texto?: string | undefined;
  numero_processo?: string | undefined;
  meio?: string | undefined;
  link?: string | undefined;
  tipoDocumento?: string | undefined;
  nomeClasse?: string | undefined;
  codigoClasse?: string | undefined;
  numeroComunicacao?: number | undefined;
  ativo?: boolean | undefined;
  hash?: string | undefined;
  status?: string | undefined;
  motivo_cancelamento?: string | null | undefined;
  data_cancelamento?: string | null | undefined;
  datadisponibilizacao?: string | undefined;
  meiocompleto?: string | undefined;
  numeroprocessocommascara?: string | undefined;
  destinatarios?: DestinatarioInterface[] | undefined;
  destinatarioadvogados?: DestinatarioAdvogadoInterface[] | undefined;
}

export interface DestinatarioInterface {
  comunicacao_id?: number | undefined;
  nome?: string | undefined;
  polo?: string | undefined;
}

export interface DestinatarioAdvogadoInterface {
  comunicacao_id?: number | undefined;
  nome?: string | undefined;
  polo?: string | undefined;
}

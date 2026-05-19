import { InvalidInputError } from '@core/error/invalid-input.error';

export class AccidentAssistanceTerminatedDocumentTypeNotAllowedError extends InvalidInputError {
  protected override readonly _type =
    AccidentAssistanceTerminatedDocumentTypeNotAllowedError.name;

  public constructor() {
    super(
      'Um ou mais tipos de documento enviados não são permitidos para o diagnóstico de auxílio-acidente (RGPS). Tipos aceitos: Processo Administrativo Indeferido, CNIS, Processo Administrativo de Suspensão ou Cessação do Benefício e Laudos Médicos.',
    );
  }
}

import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalQuestionGeneratorDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    MedicalQuestionGeneratorDocumentRequiredError.name;

  public constructor() {
    super('É necessário pelo menos um documento para gerar a análise.');
  }
}

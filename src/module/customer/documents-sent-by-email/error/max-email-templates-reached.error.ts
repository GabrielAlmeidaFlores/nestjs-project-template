import { InvalidInputError } from '@core/error/invalid-input.error';

export class MaxEmailTemplatesReachedError extends InvalidInputError {
  protected override readonly _type = MaxEmailTemplatesReachedError.name;

  public constructor(props: { maxTemplates: number }) {
    super(
      `Limite de templates atingido. Apenas ${props.maxTemplates} templates podem ser criados por usuário. Deletar algum para criar mais.`,
    );
  }
}

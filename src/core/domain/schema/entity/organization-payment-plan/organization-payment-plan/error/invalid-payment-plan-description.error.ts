import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPaymentPlanDescriptionError extends InvalidInputError {
  protected override readonly _type = InvalidPaymentPlanDescriptionError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `A descrição do plano de pagamento deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, números, espaços e caracteres especiais.`,
    );
  }
}

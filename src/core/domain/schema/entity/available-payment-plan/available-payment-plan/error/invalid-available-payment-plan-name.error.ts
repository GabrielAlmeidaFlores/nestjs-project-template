import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPaymentPlanNameError extends InvalidInputError {
  protected override readonly _type = InvalidPaymentPlanNameError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome do plano de pagamento deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, números e espaços.`,
    );
  }
}

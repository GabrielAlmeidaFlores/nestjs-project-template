import { UnexpectedError } from '@core/error/unexpected.error';

export class PaymentPlanPaidResourceIaConfigNotFoundError extends UnexpectedError {
  protected override readonly _type =
    PaymentPlanPaidResourceIaConfigNotFoundError.name;

  public constructor(props: { resourceType: string }) {
    super(
      `Configuração de IA não encontrada para o recurso ${props.resourceType}`,
    );
  }
}

import { InvalidInputError } from '@core/error/invalid-input.error';

export class UnsupportedTeacherRetirementPlanningRejectionTimeAcceleratorTypeError extends InvalidInputError {
  protected override readonly _type =
    UnsupportedTeacherRetirementPlanningRejectionTimeAcceleratorTypeError.name;

  public constructor() {
    super(
      'O tipo de acelerador de tempo de indeferimento de aposentadoria do professor não é suportado.',
    );
  }
}

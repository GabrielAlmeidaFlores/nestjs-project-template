import { UnexpectedError } from '@core/error/unexpected.error';

export class ResponseValidationError extends UnexpectedError {
  protected override readonly _type = ResponseValidationError.name;

  public constructor(props: { dtoProperty: string; dtoName: string }) {
    super(
      `Um erro foi encontrado ao tentar validar a propriedade '${props.dtoProperty}' no response DTO '${props.dtoName}'`,
    );
  }
}

import { UnexpectedError } from '@core/error/unexpected.error';

export class MissingRelationTypeError extends UnexpectedError {
  protected override readonly _type = MissingRelationTypeError.name;

  public constructor(props: {
    targetClassName: string;
    sourceClassName: string;
    relationName: string;
  }) {
    super(
      `Missing relation type for relation '${props.relationName}' in class '${props.targetClassName}' from source class '${props.sourceClassName}'.`,
    );
  }
}

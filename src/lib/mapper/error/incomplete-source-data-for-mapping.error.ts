import { UnexpectedError } from '@core/error/unexpected.error';

export class IncompleteSourceDataForMappingError extends UnexpectedError {
  protected override readonly _type = IncompleteSourceDataForMappingError.name;

  public constructor(props: { sourceClass: string; destinationClass: string }) {
    super(
      `Failed to map from '${props.sourceClass}' to '${props.destinationClass}'. The source object is missing required properties to construct the destination.`,
    );
  }
}

import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class ErrorMessageOutputModel {
  public readonly default: string;

  protected readonly _type = ErrorMessageOutputModel.name;

  public constructor(props: PublicPropertyType<ErrorMessageOutputModel>) {
    this.default = props.default;
  }
}

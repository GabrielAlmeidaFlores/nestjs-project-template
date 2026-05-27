import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class BaseDtoPropertyDecoratorPropsInputModel {
  public required?: boolean;
  public isArray?: boolean;
  public example?: unknown;
  public description?: string;
  protected readonly _type = BaseDtoPropertyDecoratorPropsInputModel.name;
}

export type BaseDtoPropertyInputType =
  PublicPropertyType<BaseDtoPropertyDecoratorPropsInputModel>;

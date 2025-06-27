import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export abstract class BaseBuildableObject {
  protected readonly _type = BaseBuildableObject.name;

  public static build<T extends object>(
    this: new () => T,
    props: PublicPropertyType<T>,
  ): T {
    return Object.assign(new this(), props);
  }
}

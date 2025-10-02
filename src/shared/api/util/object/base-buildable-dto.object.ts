import type { PublicPropertyType } from '@shared/system/type/public-property.type';

type AllowNullForOptionalType<T> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};

export abstract class BaseBuildableDtoObject {
  protected readonly _type = BaseBuildableDtoObject.name;

  public static build<T extends object>(
    this: new () => T,
    props: AllowNullForOptionalType<PublicPropertyType<T>>,
  ): T {
    const cleanProps = Object.fromEntries(
      Object.entries(props).filter(
        ([key, value]) => key !== '_type' && value !== null,
      ),
    );

    return Object.assign(new this(), cleanProps);
  }
}

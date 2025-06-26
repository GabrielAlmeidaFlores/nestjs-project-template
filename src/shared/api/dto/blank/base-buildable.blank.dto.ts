import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export abstract class BaseBuildableBlankDto {
  protected readonly _type = BaseBuildableBlankDto.name;

  public static build<T extends object>(
    this: new () => T,
    props: PublicPropertyType<T>,
  ): T {
    return Object.assign(new this(), props);
  }
}

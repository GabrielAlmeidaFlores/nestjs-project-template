import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export interface BuildClassInterface<T> {
  build(props: PublicPropertyType<T>): T;
}

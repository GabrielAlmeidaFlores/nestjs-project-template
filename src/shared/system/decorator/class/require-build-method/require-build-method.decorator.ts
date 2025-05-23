import { StaticImplements } from '@shared/system/decorator/class/static-implements/static-implements.decorator';

import type { BuildClassInterface } from '@shared/system/decorator/class/require-build-method/interface/build-class.interface';

export function RequireBuildMethod<T>(): <U extends BuildClassInterface<T>>(
  constructor: U,
) => void {
  return StaticImplements<BuildClassInterface<T>>();
}

import path from 'node:path';

import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class ImageApplicationVariable {
  public static readonly defaultAgilizaLogoPath = path.join(
    process.cwd(),
    'assets',
    'image',
    'logo',
    'logo.svg',
  );

  public static readonly source = new EnvironmentVariableService();

  public static readonly IMAGE_AGILIZA_LOGO_PATH =
    ImageApplicationVariable.source.getValueOrDefault<string>(
      'IMAGE_AGILIZA_LOGO_PATH',
      String,
      ImageApplicationVariable.defaultAgilizaLogoPath,
    );

  protected readonly _type = ImageApplicationVariable.name;
}

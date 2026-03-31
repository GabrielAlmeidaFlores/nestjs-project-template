import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';
import type { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

export class GetTutorialQueryResult extends BaseBuildableObject {
  public readonly tutorialId: TutorialId;
  public readonly name: string;
  public readonly link: string;
  public readonly functionality: TutorialFunctionalityEnum;
  public readonly description: string;
  public readonly image: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetTutorialQueryResult.name;
}

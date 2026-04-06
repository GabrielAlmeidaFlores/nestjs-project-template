import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';
import type { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

export interface TutorialEntityPropsInterface extends BaseEntityPropsInterface<TutorialId> {
  name: string;
  link: string;
  functionality: TutorialFunctionalityEnum;
  description: string;
  image: string;
}

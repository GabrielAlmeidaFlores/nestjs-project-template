import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';
import { TutorialEntityPropsInterface } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity.props.interface';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

export class TutorialEntity extends BaseEntity<TutorialId> {
  public readonly name: string;
  public readonly link: string;
  public readonly functionality: TutorialFunctionalityEnum;
  public readonly description: string;
  public readonly image: string;

  protected readonly _type = TutorialEntity.name;

  public constructor(props: TutorialEntityPropsInterface) {
    super(TutorialId, props);
    this.name = props.name;
    this.link = props.link;
    this.functionality = props.functionality;
    this.description = props.description;
    this.image = props.image;
  }
}

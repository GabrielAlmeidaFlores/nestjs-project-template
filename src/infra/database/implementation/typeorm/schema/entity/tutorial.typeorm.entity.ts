import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TutorialFunctionalityEnum } from '@module/customer/tutorial/domain/schema/entity/tutorial/enum/tutorial-functionality.enum';

@Entity({ name: 'tutorial' })
export class TutorialTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'link',
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  public link: string;

  @Column({
    name: 'functionality',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public functionality: TutorialFunctionalityEnum;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  public description: string;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public image: string;

  protected override readonly _type = TutorialTypeormEntity.name;
}

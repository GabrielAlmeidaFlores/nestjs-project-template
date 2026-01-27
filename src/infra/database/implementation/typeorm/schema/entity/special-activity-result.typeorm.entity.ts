import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';

@Entity({ name: 'special_activity_result' })
export class SpecialActivityResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'special_activity_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public specialActivitySimplifiedAnalysis: string | null;

  @Column({
    name: 'special_activity_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public specialActivityCompleteAnalysis: string | null;

  @Column({
    name: 'special_activity_simplified_analysis_download',
    type: 'text',
    nullable: true,
  })
  public specialActivitySimplifiedAnalysisDownload: string | null;

  @Column({
    name: 'special_activity_complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public specialActivityCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => SpecialActivityTypeormEntity,
    (entity) => entity.specialActivityResult,
  )
  public specialActivity?: SpecialActivityTypeormEntity | null;

  protected override readonly _type = SpecialActivityResultTypeormEntity.name;
}

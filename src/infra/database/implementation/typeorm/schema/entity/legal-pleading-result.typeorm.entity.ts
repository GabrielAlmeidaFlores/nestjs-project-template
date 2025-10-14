import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';

@Entity({ name: 'legal_pleading_result' })
export class LegalPleadingResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_pleading_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public legalPleadingCompleteAnalysis: string | null;

  @Column({
    name: 'legal_pleading_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public legalPleadingSimplifiedAnalysis: string | null;

  @OneToOne(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.legalPleadingResult,
  )
  public legalPleading?: LegalPleadingTypeormEntity | undefined;

  protected override readonly _type = LegalPleadingResultTypeormEntity.name;
}

import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';

@Entity({ name: 'special_activity' })
export class SpecialActivityTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => SpecialActivityResultTypeormEntity,
    (entity) => entity.specialActivity,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_activity_result_id' })
  public specialActivityResult?: SpecialActivityResultTypeormEntity | null;

  @OneToMany(
    () => SpecialActivityDocumentTypeormEntity,
    (entity) => entity.specialActivity,
    { nullable: true },
  )
  public specialActivityDocuments:
    | SpecialActivityDocumentTypeormEntity[]
    | null;

  @OneToMany(
    () => SpecialActivityInssBenefitTypeormEntity,
    (entity) => entity.specialActivity,
  )
  public specialActivityInssBenefit?:
    | SpecialActivityInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialActivityLegalProceedingTypeormEntity,
    (entity) => entity.specialActivity,
  )
  public specialActivityLegalProceeding?:
    | SpecialActivityLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.specialActivity,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  protected override readonly _type = SpecialActivityTypeormEntity.name;
}

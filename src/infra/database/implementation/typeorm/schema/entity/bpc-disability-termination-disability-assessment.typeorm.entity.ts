import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'bpc_disability_termination_disability_assessment' })
export class BpcDisabilityTerminationDisabilityAssessmentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'estimated_disability_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public estimatedDisabilityStartDate: Date | null;

  @Column({
    name: 'attends_school_or_technical_course',
    type: 'boolean',
    nullable: true,
  })
  public attendsSchoolOrTechnicalCourse: boolean | null;

  @Column({
    name: 'performs_labor_activity',
    type: 'boolean',
    nullable: true,
  })
  public performsLaborActivity: boolean | null;

  @Column({
    name: 'needs_third_party_help',
    type: 'boolean',
    nullable: true,
  })
  public needsThirdPartyHelp: boolean | null;

  @Column({
    name: 'has_access_to_basic_services',
    type: 'boolean',
    nullable: true,
  })
  public hasAccessToBasicServices: boolean | null;

  @Column({
    name: 'other_barriers_description',
    type: 'text',
    nullable: true,
  })
  public otherBarriersDescription: string | null;

  @OneToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?:
    | BpcDisabilityTerminationTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
    (entity) => entity.bpcDisabilityTerminationDisabilityAssessment,
  )
  public bpcDisabilityTerminationDisabilityAssessmentDocument?:
    | BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentTypeormEntity.name;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';

@Entity({ name: 'bpc_disability_termination_disability_assessment_document' })
export class BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @ManyToOne(() => BpcDisabilityTerminationDisabilityAssessmentTypeormEntity)
  @JoinColumn({
    name: 'bpc_disability_termination_disability_assessment_id',
  })
  public bpcDisabilityTerminationDisabilityAssessment?:
    | BpcDisabilityTerminationDisabilityAssessmentTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity.name;
}

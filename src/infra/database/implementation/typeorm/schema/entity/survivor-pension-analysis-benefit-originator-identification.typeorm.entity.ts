import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'survivor_pension_analysis_benefit_originator_identification' })
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_tool_client_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  public analysisToolClientId: string | null;

  @Column({
    name: 'death_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public deathDate: Date | null;

  @Column({
    name: 'federative_entity',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public federativeEntity: string | null;

  @Column({ name: 'state_code', type: 'varchar', length: 10, nullable: true })
  public stateCode: string | null;

  @Column({ name: 'beneficiary_was_retired', type: 'boolean', nullable: true })
  public beneficiaryWasRetired: boolean | null;

  @OneToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.benefitOriginatorIdentification,
    { nullable: true },
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
    (entity) => entity.benefitOriginatorIdentification,
  )
  public documents?:
    | SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity.name;
}

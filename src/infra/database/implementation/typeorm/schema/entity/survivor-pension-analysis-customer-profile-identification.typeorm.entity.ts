import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';

@Entity({ name: 'spa_customer_profile_identification' })
export class SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_tool_client_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  public analysisToolClientId: string | null;

  @Column({
    name: 'client_job_title',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientJobTitle: string | null;

  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public legalProceedingNumber: string | null;

  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public inssBenefitNumber: string | null;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({ name: 'analysis_purpose', type: 'text', nullable: true })
  public analysisPurpose: string | null;

  @OneToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.customerProfileIdentification,
    { nullable: true },
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
    (entity) => entity.customerProfileIdentification,
  )
  public documents?:
    | SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity.name;
}

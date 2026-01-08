import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';

@Entity({ name: 'analysis_tool_client_legal_proceeding' })
export class AnalysisToolClientLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.analysisToolClientLegalProceeding,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient: AnalysisToolClientTypeormEntity | undefined;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public type?: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public status?: string | null;

  @Column({ name: 'last_updated', type: 'timestamp', nullable: true })
  public lastUpdated: Date | null;

  @Column({ name: 'deadline', type: 'timestamp', nullable: true })
  public deadline: Date | null;

  @OneToMany(
    () => LegalProceedingDetailTypeormEntity,
    (entity) => entity.analysisToolClientLegalProceeding,
  )
  public legalProceedingDetail?:
    | LegalProceedingDetailTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AnalysisToolClientLegalProceedingTypeormEntity.name;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'administrative_procedure_inss_analysis_legal_proceeding' })
export class AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => AdministrativeProcedureInssAnalysisTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'administrative_procedure_inss_analysis_id' })
  public administrativeProcedureInssAnalysis:
    | AdministrativeProcedureInssAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity.name;
}

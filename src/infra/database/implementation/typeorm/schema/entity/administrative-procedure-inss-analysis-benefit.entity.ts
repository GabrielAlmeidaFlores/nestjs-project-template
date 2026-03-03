import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'administrative_procedure_inss_analysis_benefit' })
export class AdministrativeProcedureInssAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => AdministrativeProcedureInssAnalysisTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysisBenefit,
  )
  @JoinColumn({ name: 'administrative_procedure_inss_analysis_id' })
  public administrativeProcedureInssAnalysis:
    | AdministrativeProcedureInssAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    AdministrativeProcedureInssAnalysisBenefitTypeormEntity.name;
}

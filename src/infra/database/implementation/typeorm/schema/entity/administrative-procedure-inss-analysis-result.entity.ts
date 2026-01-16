import { Column, Entity, OneToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'administrative_procedure_inss_analysis_result' })
export class AdministrativeProcedureInssAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'administrative_procedure_inss_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public administrativeProcedureInssCompleteAnalysis: string | null;

  @Column({
    name: 'administrative_procedure_inss_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public administrativeProcedureInssSimplifiedAnalysis: string | null;

  @OneToOne(
    () => AdministrativeProcedureInssAnalysisTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysisResult,
  )
  public administrativeProcedureInssAnalysis?:
    | AdministrativeProcedureInssAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    AdministrativeProcedureInssAnalysisResultTypeormEntity.name;
}

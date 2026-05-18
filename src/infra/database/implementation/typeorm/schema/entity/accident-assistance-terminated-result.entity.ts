import { Column, Entity, OneToOne } from 'typeorm';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_assistance_terminated_result' })
export class AccidentAssistanceTerminatedResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'accident_assistance_terminated_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public accidentAssistanceTerminatedCompleteAnalysis: string | null;

  @Column({
    name: 'accident_assistance_terminated_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public accidentAssistanceTerminatedSimplifiedAnalysis: string | null;

  @Column({
    name: 'decision_details',
    type: 'longtext',
    nullable: true,
  })
  public decisionDetails: string | null;

  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public firstAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @OneToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedResult,
  )
  public accidentAssistanceTerminated?:
    | AccidentAssistanceTerminatedTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentAssistanceTerminatedResultTypeormEntity.name;
}

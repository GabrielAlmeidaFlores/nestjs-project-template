import { Column, Entity, OneToOne } from 'typeorm';

import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_benefit_rejection_result' })
export class AccidentBenefitRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public firstAnalysis: string | null;

  @Column({
    name: 'second_analysis',
    type: 'longtext',
    nullable: true,
  })
  public secondAnalysis: string | null;

  @Column({
    name: 'complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysis: string | null;

  @Column({
    name: 'simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public simplifiedAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @OneToOne(
    () => AccidentBenefitRejectionTypeormEntity,
    (entity) => entity.accidentBenefitRejectionResult,
  )
  public accidentBenefitRejection?:
    | AccidentBenefitRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentBenefitRejectionResultTypeormEntity.name;
}

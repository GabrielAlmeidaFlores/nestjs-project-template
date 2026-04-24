import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_result' })
export class MaternityPayRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'second_analysis', type: 'longtext', nullable: true })
  public secondAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  protected override readonly _type =
    MaternityPayRejectionResultTypeormEntity.name;
}

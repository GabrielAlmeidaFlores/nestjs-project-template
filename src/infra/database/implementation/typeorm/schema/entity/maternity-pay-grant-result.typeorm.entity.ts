import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';

@Entity({ name: 'maternity_pay_grant_result' })
export class MaternityPayGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @OneToOne(
    () => MaternityPayGrantTypeormEntity,
    (entity) => entity.maternityPayGrantResult,
  )
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | undefined;

  protected override readonly _type = MaternityPayGrantResultTypeormEntity.name;
}

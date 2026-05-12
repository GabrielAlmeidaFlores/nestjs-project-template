import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';

@Entity({ name: 'bpc_disability_grant_result' })
export class BpcDisabilityGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(() => BpcDisabilityGrantTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_grant_id' })
  public BpcDisabilityGrant?: BpcDisabilityGrantTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityGrantResultTypeormEntity.name;
}

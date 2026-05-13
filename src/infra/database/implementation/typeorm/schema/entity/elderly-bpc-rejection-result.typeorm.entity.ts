import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';

@Entity({ name: 'elderly_bpc_rejection_result' })
export class ElderlyBpcRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => ElderlyBpcRejectionTypeormEntity,
    (entity) => entity.elderlyBpcRejectionResult,
  )
  public elderlyBpcRejection?: ElderlyBpcRejectionTypeormEntity | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionResultTypeormEntity.name;
}

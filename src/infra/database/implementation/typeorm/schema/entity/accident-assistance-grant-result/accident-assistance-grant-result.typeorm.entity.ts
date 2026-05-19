import { Column, Entity, OneToOne } from 'typeorm';

import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_assistance_grant_result' })
export class AccidentAssistanceGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @OneToOne(
    () => AccidentAssistanceGrantTypeormEntity,
    (entity) => entity.accidentAssistanceGrantResult,
  )
  public accidentAssistanceGrant?: AccidentAssistanceGrantTypeormEntity | null;

  protected override readonly _type =
    AccidentAssistanceGrantResultTypeormEntity.name;
}

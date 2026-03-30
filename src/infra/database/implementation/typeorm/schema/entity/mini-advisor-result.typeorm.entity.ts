import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

@Entity({ name: 'mini_advisor_result' })
export class MiniAdvisorResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'chosen_analysis',
    type: 'simple-enum',
    enum: AnalysisToolRecordTypeEnum,
  })
  public chosenAnalysis: AnalysisToolRecordTypeEnum;

  @Column({
    name: 'benefit_description',
    type: 'text',
    nullable: true,
  })
  public benefitDescription: string | null;

  @Column({
    name: 'attention_note',
    type: 'text',
    nullable: true,
  })
  public attentionNote: string | null;

  @OneToOne(
    () => MiniAdvisorTypeormEntity,
    (entity) => entity.miniAdvisorResult,
    { nullable: true },
  )
  @JoinColumn({ name: 'mini_advisor_id' })
  public miniAdvisor?: MiniAdvisorTypeormEntity | undefined;

  protected override readonly _type = MiniAdvisorResultTypeormEntity.name;
}

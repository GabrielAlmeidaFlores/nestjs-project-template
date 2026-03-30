import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ClientGenderEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import { HasContributedWithInssEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/has-contributed-with-inss.enum';
import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';

@Entity({ name: 'mini_advisor' })
export class MiniAdvisorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'client_situation',
    type: 'simple-enum',
    enum: ClientSituationEnum,
  })
  public clientSituation: ClientSituationEnum;

  @Column({
    name: 'client_age',
    type: 'int',
  })
  public clientAge: number;

  @Column({
    name: 'client_gender',
    type: 'simple-enum',
    enum: ClientGenderEnum,
  })
  public clientGender: ClientGenderEnum;

  @Column({
    name: 'client_work_history',
    type: 'simple-array',
  })
  public clientWorkHistory: ClientWorkHistoryTypeEnum[];

  @Column({
    name: 'has_contributed_with_inss',
    type: 'simple-enum',
    enum: HasContributedWithInssEnum,
  })
  public hasContributedWithInss: HasContributedWithInssEnum;

  @Column({
    name: 'client_has_disability_or_limitations',
    type: 'boolean',
  })
  public clientHasDisabilityOrLimitations: boolean;

  @OneToOne(
    () => MiniAdvisorResultTypeormEntity,
    (entity) => entity.miniAdvisor,
    { nullable: true },
  )
  @JoinColumn({ name: 'mini_advisor_result_id' })
  public miniAdvisorResult?: MiniAdvisorResultTypeormEntity | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.miniAdvisor,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  protected override readonly _type = MiniAdvisorTypeormEntity.name;
}

import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { ClientGenderEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
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
    type: 'boolean',
  })
  public hasContributedWithInss: boolean;

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

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = MiniAdvisorTypeormEntity.name;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'system_activities' })
export class SystemActivitiesTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  public title: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  public description: string;

  @ManyToOne(() => OrganizationMemberTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'organization_member_id' })
  public organizationMember?: OrganizationMemberTypeormEntity | null;

  @ManyToOne(() => AnalysisToolClientTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | null;

  @ManyToOne(() => AnalysisToolRecordTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'analysis_tool_record_id' })
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | null;

  protected override readonly _type = SystemActivitiesTypeormEntity.name;
}

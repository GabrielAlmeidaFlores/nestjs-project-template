import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';

@Entity({ name: 'analysis_tool_record' })
export class AnalysisToolRecordTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: AnalysisStatusEnum,
    default: AnalysisStatusEnum.IN_PROGRESS,
  })
  public status: AnalysisStatusEnum;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  public code: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AnalysisToolRecordTypeEnum,
  })
  public type: AnalysisToolRecordTypeEnum;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | null;

  @ManyToOne(() => RetirementPlanningRgpsTypeormEntity)
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.analysisToolRecord,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = AnalysisToolRecordTypeormEntity.name;
}

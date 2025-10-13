import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { AnalysisRecordStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-record-status.enum';

@Entity({ name: 'cnis_fast_analysis' })
export class CnisFastAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: AnalysisRecordStatusEnum,
    default: AnalysisRecordStatusEnum.IN_PROGRESS,
  })
  public status: AnalysisRecordStatusEnum;

  @OneToOne(
    () => CnisFastAnalysisResultTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_result_id' })
  public cnisFastAnalysisResult?:
    | CnisFastAnalysisResultTypeormEntity
    | undefined;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  @OneToMany(
    () => CnisFastAnalysisInssBenefitTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisInssBenefit?:
    | CnisFastAnalysisInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => CnisFastAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisLegalProceeding?:
    | CnisFastAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisTypeormEntity.name;
}

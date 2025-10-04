import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis' })
export class CnisFastAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @OneToOne(
    () => CnisFastAnalysisResultTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_result_id' })
  public cnisFastAnalysisResult?:
    | CnisFastAnalysisResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_client_id' })
  public cnisFastAnalysisClient?:
    | AnalysisToolClientTypeormEntity
    | undefined;

  @OneToMany(
    () => AnalysisToolClientInssBenefitTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisClientInssBenefit?:
    | AnalysisToolClientInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AnalysisToolClientLegalProceedingTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisClientLegalProceeding?:
    | AnalysisToolClientLegalProceedingTypeormEntity[]
    | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisTypeormEntity.name;
}

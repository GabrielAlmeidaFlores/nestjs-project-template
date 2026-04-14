import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-document.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'bpc_elderly_analysis' })
export class BpcElderlyAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @OneToOne(
    () => BpcElderlyAnalysisResultTypeormEntity,
    (entity) => entity.bpcElderlyAnalysis,
    { nullable: true },
  )
  public bpcElderlyAnalysisResult?:
    | BpcElderlyAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcElderlyAnalysisFamilyMemberTypeormEntity,
    (entity) => entity.bpcElderlyAnalysis,
  )
  public bpcElderlyAnalysisFamilyMember?:
    | BpcElderlyAnalysisFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcElderlyAnalysisDocumentTypeormEntity,
    (entity) => entity.bpcElderlyAnalysis,
  )
  public bpcElderlyAnalysisDocument?:
    | BpcElderlyAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.bpcElderlyAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = BpcElderlyAnalysisTypeormEntity.name;
}

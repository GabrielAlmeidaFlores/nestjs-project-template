import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CnisFastAnalysisStatusEnum } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/enum/cnis-fast-analysis-status.enum';

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
    enum: CnisFastAnalysisStatusEnum,
  })
  public status: CnisFastAnalysisStatusEnum;

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
    () => CnisFastAnalysisClientTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_client_id' })
  public cnisFastAnalysisClient?:
    | CnisFastAnalysisClientTypeormEntity
    | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisTypeormEntity.name;
}

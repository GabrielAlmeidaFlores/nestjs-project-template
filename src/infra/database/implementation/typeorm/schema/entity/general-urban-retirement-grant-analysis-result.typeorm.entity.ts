import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/enum/analysis-type.enum';

@Entity({ name: 'general_urban_retirement_grant_analysis_result' })
export class GeneralUrbanRetirementGrantAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_type',
    type: 'simple-enum',
    enum: AnalysisTypeEnum,
    nullable: true,
  })
  public analysisType: AnalysisTypeEnum | null;

  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => GeneralUrbanRetirementGrantTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrantAnalysisResult,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_grant_id' })
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultTypeormEntity.name;
}

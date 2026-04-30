import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/enum/rural-or-hybrid-retirement-analysis-period-member-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_period_member_document' })
export class RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriodMemberDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_period_member_id' })
  public ruralOrHybridRetirementAnalysisPeriodMember?:
    | RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity.name;
}

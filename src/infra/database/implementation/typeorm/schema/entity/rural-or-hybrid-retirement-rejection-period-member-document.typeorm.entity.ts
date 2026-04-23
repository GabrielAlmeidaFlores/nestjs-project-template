import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/enum/rural-or-hybrid-retirement-rejection-period-member-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_period_member_document' })
export class RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionPeriodMemberDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_period_member_id' })
  public ruralOrHybridRetirementRejectionPeriodMember?:
    | RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity.name;
}

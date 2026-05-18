import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';

@Entity({
  name: 'spa_benefit_originator_identification_document',
})
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 255 })
  public documentType: string;

  @Column({ name: 'document_name', type: 'varchar', length: 500 })
  public documentName: string;

  @ManyToOne(
    () => SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'benefit_originator_identification_id',
  })
  public benefitOriginatorIdentification?:
    | SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity.name;
}

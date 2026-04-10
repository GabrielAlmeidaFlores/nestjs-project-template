import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';

@Entity({
  name: 'survivor_pension_analysis_customer_profile_identification_document',
})
export class SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 255 })
  public documentType: string;

  @Column({ name: 'document_name', type: 'varchar', length: 500 })
  public documentName: string;

  @ManyToOne(
    () => SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'customer_profile_identification_id',
  })
  public customerProfileIdentification?:
    | SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity.name;
}

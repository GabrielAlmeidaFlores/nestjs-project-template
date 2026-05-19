import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';

@Entity({ name: 'general_urban_retirement_denial_document' })
export class GeneralUrbanRetirementDenialDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialDocumentTypeEnum,
  })
  public type: GeneralUrbanRetirementDenialDocumentTypeEnum;

  @ManyToOne(
    () => GeneralUrbanRetirementDenialTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_id' })
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementDenialDocumentTypeormEntity.name;
}

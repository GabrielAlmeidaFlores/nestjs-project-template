import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';

@Entity({ name: 'legal_pleading_document' })
export class LegalPleadingDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: LegalPleadingDocumentTypeEnum,
  })
  public type: LegalPleadingDocumentTypeEnum;

  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
  })
  public document: string;

  @Column({
    name: 'document_ai_analysis',
    type: 'text',
    nullable: true,
  })
  public documentAiAnalysis: string | null;

  @ManyToOne(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.legalPleadingDocument,
  )
  @JoinColumn({ name: 'legal_pleading_id' })
  public legalPleading?: LegalPleadingTypeormEntity | undefined;

  protected override readonly _type = LegalPleadingDocumentTypeormEntity.name;
}

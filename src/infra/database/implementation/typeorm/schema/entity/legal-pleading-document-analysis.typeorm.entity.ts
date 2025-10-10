import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';

@Entity({ name: 'legal_pleading_document_analysis' })
export class LegalPleadingDocumentAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis',
    type: 'text',
    nullable: true,
  })
  public analysis: string | null;

  @OneToMany(
    () => LegalPleadingDocumentTypeormEntity,
    (entity) => entity.legalPleadingDocumentAnalysis,
  )
  public legalPleadingDocument?:
    | LegalPleadingDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    LegalPleadingDocumentAnalysisTypeormEntity.name;
}

import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'regulatory_update' })
export class RegulatoryUpdateTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'title', type: 'varchar', length: 255 })
  public title: string;

  @Column({ name: 'summary', type: 'text' })
  public summary: string;

  @Column({ name: 'main_changes', type: 'text' })
  public mainChanges: string;

  @Column({ name: 'implementation_status', type: 'text' })
  public implementationStatus: string;

  @Column({ name: 'beneficiary_impact', type: 'text' })
  public beneficiaryImpact: string;

  @Column({ name: 'full_text', type: 'longtext' })
  public fullText: string;

  @Column({ name: 'source_url', type: 'varchar', length: 500, nullable: true })
  public sourceUrl: string | null;

  @Column({
    name: 'published_at',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public publishedAt: Date | null;

  protected override readonly _type = RegulatoryUpdateTypeormEntity.name;
}

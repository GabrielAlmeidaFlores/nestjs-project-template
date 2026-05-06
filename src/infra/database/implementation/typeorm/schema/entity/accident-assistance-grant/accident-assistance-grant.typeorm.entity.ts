import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AccidentAssistanceGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.typeorm.entity';
import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';

@Entity({ name: 'accident_assistance_grant' })
export class AccidentAssistanceGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_tool_client_id',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  public analysisToolClientId: string;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: AccidentAssistanceGrantCategoryEnum,
    nullable: true,
  })
  public category: AccidentAssistanceGrantCategoryEnum | null;

  @Column({
    name: 'accident_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public accidentDate: Date | null;

  @Column({
    name: 'had_previous_temporary_disability_assistance',
    type: 'boolean',
    nullable: true,
  })
  public hadPreviousTemporaryDisabilityAssistance: boolean | null;

  @Column({
    name: 'sequel_description',
    type: 'text',
    nullable: true,
  })
  public sequelDescription: string | null;

  @Column({
    name: 'associated_cid_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public associatedCidId: string | null;

  @OneToOne(
    () => AccidentAssistanceGrantResultTypeormEntity,
    (entity) => entity.accidentAssistanceGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_grant_result_id' })
  public accidentAssistanceGrantResult?:
    | AccidentAssistanceGrantResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => AccidentAssistanceGrantDocumentTypeormEntity,
    (entity) => entity.accidentAssistanceGrant,
  )
  public accidentAssistanceGrantDocument?:
    | AccidentAssistanceGrantDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AccidentAssistanceGrantTypeormEntity.name;
}

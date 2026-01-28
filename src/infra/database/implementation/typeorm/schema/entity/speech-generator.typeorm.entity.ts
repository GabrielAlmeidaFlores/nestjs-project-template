import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpeechGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-document.typeorm.entity';
import { SpeechGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/speech-generator-result.typeorm.entity';

@Entity({ name: 'speech_generator' })
export class SpeechGeneratorTypeormEntity extends BaseTypeormEntity {
  @OneToMany(
    () => SpeechGeneratorDocumentTypeormEntity,
    (entity) => entity.speechGenerator,
  )
  public speechGeneratorDocument?:
    | SpeechGeneratorDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => SpeechGeneratorResultTypeormEntity,
    (entity) => entity.speechGenerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'speech_generator_result_id' })
  public speechGeneratorResult?: SpeechGeneratorResultTypeormEntity | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.speechGenerator,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = SpeechGeneratorTypeormEntity.name;
}

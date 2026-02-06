import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { AudienceQuestionGeneratorDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-document.typeorm.entity';
import { AudienceQuestionGeneratorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-result.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'audience_question_generator' })
export class AudienceQuestionGeneratorTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AudienceQuestionGeneratorResultTypeormEntity,
    (entity) => entity.audienceQuestionGenerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'audience_question_generator_result_id' })
  public audienceQuestionGeneratorResult?:
    | AudienceQuestionGeneratorResultTypeormEntity
    | undefined;

  @OneToMany(
    () => AudienceQuestionGeneratorDocumentTypeormEntity,
    (entity) => entity.audienceQuestionGenerator,
  )
  public audienceQuestionGeneratorDocument?:
    | AudienceQuestionGeneratorDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.audienceQuestionGenerator,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type =
    AudienceQuestionGeneratorTypeormEntity.name;
}

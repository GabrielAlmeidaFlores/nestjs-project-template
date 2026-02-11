import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import type { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';

export interface AudienceQuestionGeneratorDocumentEntityPropsInterface extends BaseEntityPropsInterface<AudienceQuestionGeneratorDocumentId> {
  document: string;
  audienceQuestionGenerator: AudienceQuestionGeneratorEntity;
}

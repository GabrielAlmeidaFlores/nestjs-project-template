import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import type { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';

export interface AudienceQuestionGeneratorLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<AudienceQuestionGeneratorLegalProceedingId> {
  legalProceedingNumber: string;
  audienceQuestionGenerator: AudienceQuestionGeneratorEntity;
}

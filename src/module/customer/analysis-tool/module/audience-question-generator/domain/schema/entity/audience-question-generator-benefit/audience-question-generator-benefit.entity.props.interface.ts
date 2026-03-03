import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import type { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

export interface AudienceQuestionGeneratorBenefitEntityPropsInterface extends BaseEntityPropsInterface<AudienceQuestionGeneratorBenefitId> {
  inssBenefitNumber: string;
  audienceQuestionGenerator: AudienceQuestionGeneratorEntity;
}

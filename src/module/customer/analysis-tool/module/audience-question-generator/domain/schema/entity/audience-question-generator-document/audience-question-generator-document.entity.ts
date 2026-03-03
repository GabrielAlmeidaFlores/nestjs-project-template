import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AudienceQuestionGeneratorDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity.props.interface';

export class AudienceQuestionGeneratorDocumentEntity extends BaseEntity<AudienceQuestionGeneratorDocumentId> {
  @Description('Documento do gerador de perguntas de audiência.')
  public readonly document: string;

  @Description('Gerador de perguntas de audiência.')
  public readonly audienceQuestionGenerator: AudienceQuestionGeneratorEntity;

  protected readonly _type = AudienceQuestionGeneratorDocumentEntity.name;

  public constructor(
    props: AudienceQuestionGeneratorDocumentEntityPropsInterface,
  ) {
    super(AudienceQuestionGeneratorDocumentId, props);

    this.document = props.document;
    this.audienceQuestionGenerator = props.audienceQuestionGenerator;
  }
}

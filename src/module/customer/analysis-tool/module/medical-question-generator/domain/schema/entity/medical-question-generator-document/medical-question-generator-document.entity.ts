import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

import type { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import type { MedicalQuestionGeneratorDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity.props.interface';

export class MedicalQuestionGeneratorDocumentEntity extends BaseEntity<MedicalQuestionGeneratorDocumentId> {
  public readonly document: string;
  public readonly type: MedicalQuestionGeneratorDocumentTypeEnum;

  protected readonly _type = MedicalQuestionGeneratorDocumentEntity.name;

  public constructor(
    props: MedicalQuestionGeneratorDocumentEntityPropsInterface,
  ) {
    super(MedicalQuestionGeneratorDocumentId, props);

    this.document = props.document;
    this.type = props.type;
  }
}

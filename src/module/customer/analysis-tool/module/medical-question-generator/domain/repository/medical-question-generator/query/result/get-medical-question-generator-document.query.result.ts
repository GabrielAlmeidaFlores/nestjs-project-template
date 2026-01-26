import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import type { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';

export class GetMedicalQuestionGeneratorDocumentQueryResult extends BaseBuildableObject {
  public readonly id: MedicalQuestionGeneratorDocumentId;
  public readonly document: string;
  public readonly type: MedicalQuestionGeneratorDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalQuestionGeneratorDocumentQueryResult.name;
}

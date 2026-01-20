import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';

export class GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly document: string;
  public readonly type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult.name;
}


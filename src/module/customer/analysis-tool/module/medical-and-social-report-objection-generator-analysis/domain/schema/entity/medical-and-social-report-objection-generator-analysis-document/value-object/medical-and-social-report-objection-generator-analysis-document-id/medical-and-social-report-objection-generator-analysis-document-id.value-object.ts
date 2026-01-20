import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId extends Guid {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId.name;
}


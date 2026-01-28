import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalAndSocialReportObjectionGeneratorAnalysisId extends Guid {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisId.name;
}

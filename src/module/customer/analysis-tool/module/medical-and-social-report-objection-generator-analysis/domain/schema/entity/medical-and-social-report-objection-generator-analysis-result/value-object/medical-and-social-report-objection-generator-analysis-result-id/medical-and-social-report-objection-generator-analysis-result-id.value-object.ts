import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalAndSocialReportObjectionGeneratorAnalysisResultId extends Guid {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultId.name;
}


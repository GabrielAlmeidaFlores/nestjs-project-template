import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSpecialRetirementGrantTechnicalDiagnosisQueryResult extends BaseBuildableObject {
  public readonly periodStartDate: Date;
  public readonly periodEndDate: Date;
  public readonly recognized: boolean;
  public readonly justification: string;
  public readonly company: string;
  public readonly cnpj: string;
  public readonly role: string;
  public readonly supportingDocument: string;
  public readonly recordedInCnis: boolean;
  public readonly remunerationRecordedInCnis: boolean;
  public readonly hazardousAgents: string;
  public readonly informationSource: string;
  public readonly legalFramework: string;
  public readonly epiEficaz: boolean | null;
  public readonly observations: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantTechnicalDiagnosisQueryResult.name;
}

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/value-object/special-retirement-rejection-technical-diagnosis-id/special-retirement-rejection-technical-diagnosis-id.value-object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionTechnicalDiagnosisEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/special-retirement-rejection-technical-diagnosis.entity.props.interface';

export class SpecialRetirementRejectionTechnicalDiagnosisEntity extends BaseEntity<SpecialRetirementRejectionTechnicalDiagnosisId> {
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
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId;

  protected readonly _type =
    SpecialRetirementRejectionTechnicalDiagnosisEntity.name;

  public constructor(
    props: SpecialRetirementRejectionTechnicalDiagnosisEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionTechnicalDiagnosisId, props);

    this.periodStartDate = props.periodStartDate;
    this.periodEndDate = props.periodEndDate;
    this.recognized = props.recognized;
    this.justification = props.justification;
    this.company = props.company;
    this.cnpj = props.cnpj;
    this.role = props.role;
    this.supportingDocument = props.supportingDocument;
    this.recordedInCnis = props.recordedInCnis;
    this.remunerationRecordedInCnis = props.remunerationRecordedInCnis;
    this.hazardousAgents = props.hazardousAgents;
    this.informationSource = props.informationSource;
    this.legalFramework = props.legalFramework;
    this.epiEficaz = props.epiEficaz ?? null;
    this.observations = props.observations ?? null;
    this.specialRetirementRejectionId = props.specialRetirementRejectionId;
  }
}

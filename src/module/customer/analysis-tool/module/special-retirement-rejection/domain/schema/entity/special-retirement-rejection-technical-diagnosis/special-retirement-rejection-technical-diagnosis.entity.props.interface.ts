import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/value-object/special-retirement-rejection-technical-diagnosis-id/special-retirement-rejection-technical-diagnosis-id.value-object';

export interface SpecialRetirementRejectionTechnicalDiagnosisEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionTechnicalDiagnosisId> {
  periodStartDate: Date;
  periodEndDate: Date;
  recognized: boolean;
  justification: string;
  company: string;
  cnpj: string;
  role: string;
  supportingDocument: string;
  recordedInCnis: boolean;
  remunerationRecordedInCnis: boolean;
  hazardousAgents: string;
  informationSource: string;
  legalFramework: string;
  epiEficaz?: boolean | null;
  observations?: string | null;
  specialRetirementRejectionId: SpecialRetirementRejectionId;
}

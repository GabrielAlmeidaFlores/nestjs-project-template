import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import type { SpecialRetirementGrantTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/value-object/special-retirement-grant-technical-diagnosis-id/special-retirement-grant-technical-diagnosis-id.value-object';

export interface SpecialRetirementGrantTechnicalDiagnosisEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantTechnicalDiagnosisId> {
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
  specialRetirementGrant: SpecialRetirementGrantEntity;
}

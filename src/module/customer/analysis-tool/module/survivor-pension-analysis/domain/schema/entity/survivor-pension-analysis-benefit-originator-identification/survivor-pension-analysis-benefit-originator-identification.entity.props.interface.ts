import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

export interface SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisBenefitOriginatorIdentificationId> {
  survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  clientName?: string | null;
  clientFederalDocument?: FederalDocument | null;
  clientBirthDate?: Date | null;
  clientGender?: GenderEnum | null;
  deathDate?: Date | null;
  federativeEntity?: string | null;
  stateCode?: string | null;
  beneficiaryWasRetired?: boolean | null;
}

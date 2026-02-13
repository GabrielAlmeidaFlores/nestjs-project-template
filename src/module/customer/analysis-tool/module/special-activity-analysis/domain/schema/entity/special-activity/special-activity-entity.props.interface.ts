import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import type { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/special-activity-document.entity';
import type { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import type { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import type { SpecialActivityResultEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/special-activity-result.entity';

export interface SpecialActivityEntityPropsInterface extends BaseEntityPropsInterface<SpecialActivityId> {
  specialActivityResult?: SpecialActivityResultEntity | null;
  specialActivityDocuments?: SpecialActivityDocumentEntity[] | null;
  specialActivityInssBenefit?: SpecialActivityInssBenefitEntity[] | null;
  specialActivityLegalProceeding?:
    | SpecialActivityLegalProceedingEntity[]
    | null;
}

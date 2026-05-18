import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';

import type { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import type { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import type { MaternityPayRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity.props.interface';
import type { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

export class MaternityPayRejectionEntity extends BaseEntity<MaternityPayRejectionId> {
  public readonly triggeringEvent: MaternityPayRejectionTriggeringEventEnum | null;
  public readonly analysisName: string | null;
  public readonly isCurrentlyUnemployed: boolean | null;
  public readonly category: MaternityPayRejectionCategoryEnum | null;
  public readonly triggeringEventDate: Date | null;
  public readonly estimatedTriggeringEventDate: Date | null;
  public readonly workAccidentOrSevereDesease: boolean | null;
  public readonly clientWasUnemployedOnBenefitOrDisabilityStartDate:
    | boolean
    | null;
  public readonly clientWasRuralInsuredOnBenefitOrDisabilityStartDate:
    | boolean
    | null;
  public readonly thirdPartyDocumentRelationDescription: string | null;
  public readonly maternityPayRejectionResultId: MaternityPayRejectionResultId | null;

  protected readonly _type = MaternityPayRejectionEntity.name;

  public constructor(props: MaternityPayRejectionEntityPropsInterface) {
    super(MaternityPayRejectionId, props);
    this.triggeringEvent = props.triggeringEvent ?? null;
    this.analysisName = props.analysisName ?? null;
    this.isCurrentlyUnemployed = props.isCurrentlyUnemployed ?? null;
    this.category = props.category ?? null;
    this.triggeringEventDate = props.triggeringEventDate ?? null;
    this.estimatedTriggeringEventDate =
      props.estimatedTriggeringEventDate ?? null;
    this.workAccidentOrSevereDesease =
      props.workAccidentOrSevereDesease ?? null;
    this.clientWasUnemployedOnBenefitOrDisabilityStartDate =
      props.clientWasUnemployedOnBenefitOrDisabilityStartDate ?? null;
    this.clientWasRuralInsuredOnBenefitOrDisabilityStartDate =
      props.clientWasRuralInsuredOnBenefitOrDisabilityStartDate ?? null;
    this.thirdPartyDocumentRelationDescription =
      props.thirdPartyDocumentRelationDescription ?? null;
    this.maternityPayRejectionResultId =
      props.maternityPayRejectionResultId ?? null;
  }
}

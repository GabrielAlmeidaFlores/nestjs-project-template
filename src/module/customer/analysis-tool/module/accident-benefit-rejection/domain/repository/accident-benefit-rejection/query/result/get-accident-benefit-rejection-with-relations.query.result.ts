import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import type { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import type { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import type { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';
import type { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';
import type { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import type { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';
import type { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';
import type { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';

export class GetAccidentBenefitRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly accidentBenefitRejectionId: AccidentBenefitRejectionId;
  public readonly analysisName: string | null;
  public readonly requirementStartDate: Date | null;
  public readonly rejectionDate: Date | null;
  public readonly category: AccidentBenefitRejectionCategoryEnum | null;
  public readonly mainAccidentBenefitRejectionReason: AccidentBenefitRejectionMainReasonEnum | null;
  public readonly otherAccidentBenefitRejectionReason: string | null;
  public readonly hasPreviousGrantRelated: boolean | null;
  public readonly previousGrantBenefitNumber: string | null;
  public readonly previousGrantStartDate: Date | null;
  public readonly previousGrantTerminationDate: Date | null;
  public readonly requestToExtendTemporaryDisabilityBenefit: AccidentBenefitRejectionRequestToExtendEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly accidentBenefitRejectionResult: AccidentBenefitRejectionResultEntity | null;
  public readonly accidentBenefitRejectionInssBenefit:
    | AccidentBenefitRejectionInssBenefitEntity[]
    | null;
  public readonly accidentBenefitRejectionDocument:
    | AccidentBenefitRejectionDocumentEntity[]
    | null;
  public readonly accidentBenefitRejectionEvent:
    | AccidentBenefitRejectionEventEntity[]
    | null;
  public readonly accidentBenefitRejectionEventDocument:
    | AccidentBenefitRejectionEventDocumentEntity[]
    | null;
  public readonly accidentBenefitRejectionWorkPeriod:
    | AccidentBenefitRejectionWorkPeriodEntity[]
    | null;
  public readonly accidentBenefitRejectionWorkPeriodDocument:
    | AccidentBenefitRejectionWorkPeriodDocumentEntity[]
    | null;
  public readonly accidentBenefitRejectionWorkPeriodEarningsHistory:
    | AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetAccidentBenefitRejectionWithRelationsQueryResult.name;
}

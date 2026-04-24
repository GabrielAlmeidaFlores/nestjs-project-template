import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import type { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';
import type { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';
import type { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';
import type { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import type { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';
import type { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';

export class GetMaternityPayRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MaternityPayRejectionId;
  public readonly triggeringEvent: MaternityPayRejectionTriggeringEventEnum | null;
  public readonly analysisName: string | null;
  public readonly isCurrentlyUnemployed: boolean | null;
  public readonly category: MaternityPayRejectionCategoryEnum | null;
  public readonly triggeringEventDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly maternityPayRejectionResult: MaternityPayRejectionResultEntity | null;
  public readonly maternityPayRejectionInssBenefit:
    | MaternityPayRejectionInssBenefitEntity[]
    | null;
  public readonly maternityPayRejectionLegalProceeding:
    | MaternityPayRejectionLegalProceedingEntity[]
    | null;
  public readonly maternityPayRejectionDocument:
    | MaternityPayRejectionDocumentEntity[]
    | null;
  public readonly maternityPayRejectionWorkPeriod:
    | MaternityPayRejectionWorkPeriodEntity[]
    | null;
  public readonly maternityPayRejectionWorkPeriodDocument:
    | MaternityPayRejectionWorkPeriodDocumentEntity[]
    | null;
  public readonly maternityPayRejectionWorkPeriodEarningsHistory:
    | MaternityPayRejectionWorkPeriodEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetMaternityPayRejectionWithRelationsQueryResult.name;
}

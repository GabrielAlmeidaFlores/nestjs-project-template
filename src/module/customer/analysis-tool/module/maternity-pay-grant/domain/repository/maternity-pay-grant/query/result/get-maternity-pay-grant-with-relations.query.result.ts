import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { MaternityPayGrantBenefitTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-benefit-triggering-event.enum';
import type { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';
import type { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import type { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';
import type { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';
import type { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import type { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';
import type { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export class GetMaternityPayGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MaternityPayGrantId;
  public readonly analysisName: string | null;
  public readonly category: MaternityPayGrantCategoryEnum | null;
  public readonly triggeringEvent: MaternityPayGrantTriggeringEventEnum | null;
  public readonly triggeringEventDate: Date | null;
  public readonly cnisDocument: string | null;
  public readonly isTriggeringEventDateValid: boolean | null;
  public readonly isCurrentlyUnemployed: boolean | null;
  public readonly isUnemployedAtTriggeringEventDate: boolean | null;
  public readonly isRuralInsured: boolean | null;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly ruralPeriodDocumentDescription: string | null;
  public readonly benefitTriggeringEvent: MaternityPayGrantBenefitTriggeringEventEnum | null;
  public readonly benefitTriggeringEventDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly maternityPayGrantResult: MaternityPayGrantResultEntity | null;
  public readonly maternityPayGrantInssBenefit:
    | MaternityPayGrantInssBenefitEntity[]
    | null;
  public readonly maternityPayGrantLegalProceeding:
    | MaternityPayGrantLegalProceedingEntity[]
    | null;
  public readonly maternityPayGrantDocument:
    | MaternityPayGrantDocumentEntity[]
    | null;
  public readonly maternityPayGrantPeriod:
    | MaternityPayGrantPeriodEntity[]
    | null;
  public readonly maternityPayGrantPeriodDocument:
    | MaternityPayGrantPeriodDocumentEntity[]
    | null;
  public readonly maternityPayGrantEarningsHistory:
    | MaternityPayGrantEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetMaternityPayGrantWithRelationsQueryResult.name;
}

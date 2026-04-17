import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export interface MaternityPayGrantEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantId> {
  analysisName?: string | null;
  category?: MaternityPayGrantCategoryEnum | null;
  triggeringEvent?: MaternityPayGrantTriggeringEventEnum | null;
  triggeringEventDate?: Date | null;
  cnisDocument?: string | null;
  isCurrentlyUnemployed?: boolean | null;
  isUnemployedAtTriggeringEventDate?: boolean | null;
  isRuralInsured?: boolean | null;
  ruralPeriodStartDate?: Date | null;
  ruralPeriodEndDate?: Date | null;
  ruralPeriodDocumentDescription?: string | null;
  maternityPayGrantResultId?: MaternityPayGrantResultId | null;
}

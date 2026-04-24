import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import type { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

export interface MaternityPayRejectionEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionId> {
  triggeringEvent?: MaternityPayRejectionTriggeringEventEnum | null;
  analysisName?: string | null;
  isCurrentlyUnemployed?: boolean | null;
  category?: MaternityPayRejectionCategoryEnum | null;
  triggeringEventDate?: Date | null;
  maternityPayRejectionResultId?: MaternityPayRejectionResultId | null;
}

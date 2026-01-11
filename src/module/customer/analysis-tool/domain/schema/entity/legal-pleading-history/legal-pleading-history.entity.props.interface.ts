import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';
import type { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

export interface LegalPleadingHistoryEntityPropsInterface extends BaseEntityPropsInterface<LegalPleadingHistoryId> {
  title: LegalPleadingHistoryTitleEnum;
  description: string;
  legalPleading: LegalPleadingId;
}

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';
import type { LegalPleadingHistoryEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/legal-pleading-history.entity.props.interface';

export class LegalPleadingHistoryEntity extends BaseEntity<LegalPleadingHistoryId> {
  @Description('Título do histórico da peça processual.')
  public readonly title: LegalPleadingHistoryTitleEnum;

  @Description('Descrição detalhada da alteração.')
  public readonly description: string;

  @Description('Referência à peça processual.')
  public readonly legalPleading: LegalPleadingId;

  protected readonly _type = LegalPleadingHistoryEntity.name;

  public constructor(props: LegalPleadingHistoryEntityPropsInterface) {
    super(LegalPleadingHistoryId, props);

    this.title = props.title;
    this.description = props.description;
    this.legalPleading = props.legalPleading;
  }
}

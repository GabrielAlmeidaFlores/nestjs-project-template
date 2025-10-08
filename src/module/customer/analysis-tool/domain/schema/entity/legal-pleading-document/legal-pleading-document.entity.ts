import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import type { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import type { LegalPleadingDocumentEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity.props.interface';

export class LegalPleadingDocumentEntity extends BaseEntity<LegalPleadingDocumentId> {
  @Description('Tipo do documento legal anexado à petição.')
  public readonly type: LegalPleadingDocumentTypeEnum;

  @Description('Nome do documento legal anexado à petição.')
  public readonly document: string;

  @Description('Petição legal à qual o documento está anexado.')
  public readonly legalPleading: LegalPleadingEntity;

  protected readonly _type = LegalPleadingDocumentEntity.name;

  public constructor(props: LegalPleadingDocumentEntityPropsInterface) {
    super(LegalPleadingDocumentId, props);

    this.type = props.type;
    this.document = props.document;
    this.legalPleading = props.legalPleading;
  }
}

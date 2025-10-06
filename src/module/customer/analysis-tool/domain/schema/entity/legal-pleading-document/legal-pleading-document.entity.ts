import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';

import type { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import type { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import type { LegalPleadingDocumentEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity.props.interface';

export class LegalPleadingDocumentEntity extends BaseEntity<LegalPleadingDocumentId> {
  public readonly type: LegalPleadingDocumentTypeEnum;
  public readonly document: string;
  public readonly legalPleading: LegalPleadingEntity;

  protected readonly _type = LegalPleadingDocumentEntity.name;

  public constructor(props: LegalPleadingDocumentEntityPropsInterface) {
    super(LegalPleadingDocumentId, props);

    this.type = props.type;
    this.document = props.document;
    this.legalPleading = props.legalPleading;
  }
}

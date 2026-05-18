import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/value-object/elderly-bpc-rejection-document-id/elderly-bpc-rejection-document-id.value-object';

import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity.props.interface';
import type { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';

export class ElderlyBpcRejectionDocumentEntity extends BaseEntity<ElderlyBpcRejectionDocumentId> {
  public readonly document: string | null;
  public readonly type: ElderlyBpcRejectionDocumentTypeEnum | null;
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected readonly _type = ElderlyBpcRejectionDocumentEntity.name;

  public constructor(props: ElderlyBpcRejectionDocumentEntityPropsInterface) {
    super(ElderlyBpcRejectionDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.elderlyBpcRejectionId = props.elderlyBpcRejectionId;
  }
}

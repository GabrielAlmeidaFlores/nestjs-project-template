import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/value-object/elderly-bpc-rejection-familiar-group-document-id/elderly-bpc-rejection-familiar-group-document-id.value-object';

import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity.props.interface';
import type { ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/enum/elderly-bpc-rejection-familiar-group-document-type.enum';

export class ElderlyBpcRejectionFamiliarGroupDocumentEntity extends BaseEntity<ElderlyBpcRejectionFamiliarGroupDocumentId> {
  public readonly document: string | null;
  public readonly type: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum | null;
  public readonly elderlyBpcRejectionFamiliarGroupId: ElderlyBpcRejectionFamiliarGroupId;

  protected readonly _type =
    ElderlyBpcRejectionFamiliarGroupDocumentEntity.name;

  public constructor(
    props: ElderlyBpcRejectionFamiliarGroupDocumentEntityPropsInterface,
  ) {
    super(ElderlyBpcRejectionFamiliarGroupDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.elderlyBpcRejectionFamiliarGroupId =
      props.elderlyBpcRejectionFamiliarGroupId;
  }
}

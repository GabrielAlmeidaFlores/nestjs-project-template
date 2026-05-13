import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';
import type { ElderlyBpcRejectionDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/value-object/elderly-bpc-rejection-document-id/elderly-bpc-rejection-document-id.value-object';

export interface ElderlyBpcRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionDocumentId> {
  document?: string | null;
  type?: ElderlyBpcRejectionDocumentTypeEnum | null;
  elderlyBpcRejectionId: ElderlyBpcRejectionId;
}

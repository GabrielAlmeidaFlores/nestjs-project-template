import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/enum/elderly-bpc-rejection-familiar-group-document-type.enum';
import type { ElderlyBpcRejectionFamiliarGroupDocumentId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/value-object/elderly-bpc-rejection-familiar-group-document-id/elderly-bpc-rejection-familiar-group-document-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';

export interface ElderlyBpcRejectionFamiliarGroupDocumentEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionFamiliarGroupDocumentId> {
  document?: string | null;
  type?: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum | null;
  elderlyBpcRejectionFamiliarGroupId: ElderlyBpcRejectionFamiliarGroupId;
}

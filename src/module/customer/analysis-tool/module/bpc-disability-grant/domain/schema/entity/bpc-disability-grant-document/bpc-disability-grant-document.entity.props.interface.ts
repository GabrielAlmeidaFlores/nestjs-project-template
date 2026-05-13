import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';
import type { BpcDisabilityGrantDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/value-object/bpc-disability-grant-document-id/bpc-disability-grant-document-id.value-object';

export interface BpcDisabilityGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantDocumentId> {
  document: string;
  type: BpcDisabilityGrantDocumentTypeEnum;
  BpcDisabilityGrantId: BpcDisabilityGrantId;
}

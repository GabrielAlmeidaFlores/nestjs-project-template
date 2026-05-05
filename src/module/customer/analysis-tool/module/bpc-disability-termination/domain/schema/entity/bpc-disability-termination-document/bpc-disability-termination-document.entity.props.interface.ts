import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import type { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import type { BpcDisabilityTerminationDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/value-object/bpc-disability-termination-document-id/bpc-disability-termination-document-id.value-object';

export interface BpcDisabilityTerminationDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationDocumentId> {
  document: string;
  name: string;
  type: BpcDisabilityTerminationDocumentTypeEnum;
  bpcDisabilityTermination: BpcDisabilityTerminationEntity;
}

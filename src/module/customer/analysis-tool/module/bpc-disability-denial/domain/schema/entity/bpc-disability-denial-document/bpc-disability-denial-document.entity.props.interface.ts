import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import type { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import type { BpcDisabilityDenialDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/value-object/bpc-disability-denial-document-id/bpc-disability-denial-document-id.value-object';

export interface BpcDisabilityDenialDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialDocumentId> {
  document: string;
  type: BpcDisabilityDenialDocumentTypeEnum;
  bpcDisabilityDenial: BpcDisabilityDenialEntity;
}

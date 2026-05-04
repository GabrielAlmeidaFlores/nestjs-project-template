import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import type { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import type { BpcElderlyCessationDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/value-object/bpc-elderly-cessation-document-id/bpc-elderly-cessation-document-id.value-object';

export interface BpcElderlyCessationDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationDocumentId> {
  document: string;
  type: BpcElderlyCessationDocumentTypeEnum;
  bpcElderlyCessation: BpcElderlyCessationEntity;
}

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/value-object/temporary-incapacity-benefit-rejection-document-id.value-object';

export interface TemporaryIncapacityBenefitRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitRejectionDocumentTypeEnum;
  temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;
}

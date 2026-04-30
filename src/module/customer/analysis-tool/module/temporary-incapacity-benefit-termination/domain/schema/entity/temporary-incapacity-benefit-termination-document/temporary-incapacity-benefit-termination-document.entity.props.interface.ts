import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/value-object/temporary-incapacity-benefit-termination-document-id.value-object';

export interface TemporaryIncapacityBenefitTerminationDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;
  temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;
}

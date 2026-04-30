import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/enum/temporary-incapacity-benefit-termination-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/value-object/temporary-incapacity-benefit-termination-insured-status-document-id.value-object';

export interface TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum;
  temporaryIncapacityBenefitTerminationInsuredStatusId: TemporaryIncapacityBenefitTerminationInsuredStatusId;
}

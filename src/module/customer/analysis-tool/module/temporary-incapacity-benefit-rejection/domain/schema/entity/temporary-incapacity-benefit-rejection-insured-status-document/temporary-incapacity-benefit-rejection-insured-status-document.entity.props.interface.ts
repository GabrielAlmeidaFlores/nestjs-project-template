import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/enum/temporary-incapacity-benefit-rejection-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/value-object/temporary-incapacity-benefit-rejection-insured-status-document-id.value-object';

export interface TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum;
  temporaryIncapacityBenefitRejectionInsuredStatusId: TemporaryIncapacityBenefitRejectionInsuredStatusId;
}

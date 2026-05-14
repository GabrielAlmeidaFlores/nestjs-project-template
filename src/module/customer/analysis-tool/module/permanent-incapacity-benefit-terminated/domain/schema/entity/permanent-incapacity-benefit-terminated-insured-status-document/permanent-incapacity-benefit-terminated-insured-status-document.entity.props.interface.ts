import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/enum/permanent-incapacity-benefit-terminated-insured-status-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/value-object/permanent-incapacity-benefit-terminated-insured-status-document-id.value-object';

export interface PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId> {
  fileName: string;
  type: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum;
  permanentIncapacityBenefitTerminatedInsuredStatusId: PermanentIncapacityBenefitTerminatedInsuredStatusId;
}

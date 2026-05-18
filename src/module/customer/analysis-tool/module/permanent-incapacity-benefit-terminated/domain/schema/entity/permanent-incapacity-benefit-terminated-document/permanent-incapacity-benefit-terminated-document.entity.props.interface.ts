import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/value-object/permanent-incapacity-benefit-terminated-document-id.value-object';

export interface PermanentIncapacityBenefitTerminatedDocumentEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedDocumentId> {
  fileName: string;
  type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;
  permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;
}

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-document/value-object/death-benefit-rejection-document-id.value-object';
import type { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';
import type { DeathBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-document-type.enum';

export interface DeathBenefitRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionDocumentId> {
  document: string;
  type: DeathBenefitRejectionDocumentTypeEnum;
  deathBenefitRejectionInstitorId: DeathBenefitRejectionInstitorId;
}

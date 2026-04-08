import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-document-type.enum';

export interface DeathBenefitDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitDocumentId> {
  document: string;
  type: DeathBenefitDocumentTypeEnum;
  deathBenefitId: DeathBenefitId;
}

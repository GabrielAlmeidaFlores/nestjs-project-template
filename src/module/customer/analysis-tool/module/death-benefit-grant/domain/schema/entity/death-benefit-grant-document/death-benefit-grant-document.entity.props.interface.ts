import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import type { DeathBenefitGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-document-type.enum';

export interface DeathBenefitGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantDocumentId> {
  document: string;
  type: DeathBenefitGrantDocumentTypeEnum;
  deathBenefitGrantId: DeathBenefitGrantId;
}

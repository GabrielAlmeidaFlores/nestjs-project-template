import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/enum/special-retirement-grant-period-document-type.enum';
import type { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

export interface SpecialRetirementGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodDocumentId> {
  type: SpecialRetirementGrantPeriodDocumentTypeEnum;
  document: string;
  specialRetirementGrantPeriodId: string;
}

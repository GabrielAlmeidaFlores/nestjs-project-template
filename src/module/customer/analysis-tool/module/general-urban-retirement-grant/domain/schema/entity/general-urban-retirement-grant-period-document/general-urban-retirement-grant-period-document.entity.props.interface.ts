import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import type { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

export interface GeneralUrbanRetirementGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantPeriodDocumentId> {
  document: string;
  generalUrbanRetirementGrantPeriod?: GeneralUrbanRetirementGrantPeriodEntity | null;
}

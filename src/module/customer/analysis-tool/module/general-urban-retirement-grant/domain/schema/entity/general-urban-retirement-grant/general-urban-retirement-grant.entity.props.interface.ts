import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

export interface GeneralUrbanRetirementGrantEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantId> {
  cnisDocument?: string | null;
  analysisName?: string | null;
  generalUrbanRetirementGrantResult?: GeneralUrbanRetirementGrantResultEntity | null;
}

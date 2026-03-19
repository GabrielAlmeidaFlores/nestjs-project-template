import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';

export class ListGeneralUrbanRetirementGrantPeriodQueryParam extends ListDataInputModel {
  public generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantId | undefined;

  protected override readonly _type =
    ListGeneralUrbanRetirementGrantPeriodQueryParam.name;

  public constructor(
    props: Partial<ListGeneralUrbanRetirementGrantPeriodQueryParam> = {},
  ) {
    super(props);
    this.generalUrbanRetirementGrant = props.generalUrbanRetirementGrant ?? undefined;
  }
}

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/general-urban-retirement-grant-special-period.entity.props.interface';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';

export class GeneralUrbanRetirementGrantSpecialPeriodEntity extends BaseEntity<GeneralUrbanRetirementGrantSpecialPeriodId> {
  @Description('Resposta da análise do período especial.')
  public readonly response: string;

  @Description('Concessão de aposentadoria urbana associada ao período especial.')
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantSpecialPeriodEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantSpecialPeriodId, props);
    this.response = props.response;
    this.generalUrbanRetirementGrant =
      props.generalUrbanRetirementGrant ?? null;
  }
}

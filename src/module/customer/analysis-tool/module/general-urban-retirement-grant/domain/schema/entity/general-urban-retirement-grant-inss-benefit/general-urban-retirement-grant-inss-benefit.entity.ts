import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity.props.interface';
import { GeneralUrbanRetirementGrantInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/value-object/general-urban-retirement-grant-inss-benefit-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementGrantInssBenefitEntity extends BaseEntity<GeneralUrbanRetirementGrantInssBenefitId> {
  @Description('Número do benefício INSS associado à concessão de aposentadoria urbana.')
  public readonly inssBenefitNumber: string;

  @Description('Concessão de aposentadoria urbana associada ao benefício INSS.')
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;

  protected readonly _type =
    GeneralUrbanRetirementGrantInssBenefitEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantInssBenefitEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.generalUrbanRetirementGrant = props.generalUrbanRetirementGrant;
  }
}

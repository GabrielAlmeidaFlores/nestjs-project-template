import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity.props.interface';
import { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementGrantLegalProceedingEntity extends BaseEntity<GeneralUrbanRetirementGrantLegalProceedingId> {
  @Description('Número do processo judicial relacionado à concessão de aposentadoria urbana.')
  public readonly legalProceedingNumber: string;

  @Description('Concessão de aposentadoria urbana associada ao processo judicial.')
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;

  protected readonly _type =
    GeneralUrbanRetirementGrantLegalProceedingEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantLegalProceedingEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.generalUrbanRetirementGrant = props.generalUrbanRetirementGrant;
  }
}

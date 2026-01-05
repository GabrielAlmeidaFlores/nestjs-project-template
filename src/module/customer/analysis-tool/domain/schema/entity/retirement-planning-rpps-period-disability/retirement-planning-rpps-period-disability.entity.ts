import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RetirementPlanningRppsPeriodDisabilityEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity.props.interface';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsPeriodDisabilityEntity extends BaseEntity<RetirementPlanningRppsPeriodDisabilityId> {
  @Description('Tipo de deficiência')
  public readonly type: RetirementPlanningDisabilityTimeTypeEnum;

  @Description('Grau de deficiência')
  public readonly degree: RetirementPlanningDisabilityDegreeEnum;

  @Description('Data de início da deficiência')
  public readonly startDate: Date;

  @Description('Data de término da deficiência')
  public readonly endDate: Date;

  @Description('Categoria da deficiência')
  public readonly category: RetirementPlanningDisabilityCategoryEnum;

  @Description('Descrição da deficiência')
  public readonly description: string;

  @Description('Impacto diário da deficiência')
  public readonly dailyImpact: string;

  @Description('CID-10 associado à deficiência')
  public readonly cidTen: CidTenEntity;

  @Description('Período RPPS associado à deficiência')
  public readonly retirementPlanningRppsPeriod: RetirementPlanningRppsPeriodEntity | null;

  protected readonly _type = RetirementPlanningRppsPeriodDisabilityEntity.name;

  public constructor(
    props: RetirementPlanningRppsPeriodDisabilityEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsPeriodDisabilityId, props);
    this.type = props.type;
    this.degree = props.degree;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.category = props.category;
    this.description = props.description;
    this.dailyImpact = props.dailyImpact;
    this.cidTen = props.cidTen;
    this.retirementPlanningRppsPeriod = props.retirementPlanningRppsPeriod;
  }
}

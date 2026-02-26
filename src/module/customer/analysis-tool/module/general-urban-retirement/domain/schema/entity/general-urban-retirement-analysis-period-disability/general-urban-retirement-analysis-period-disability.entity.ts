import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity.props.interface';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementAnalysisPeriodDisabilityEntity extends BaseEntity<GeneralUrbanRetirementAnalysisPeriodDisabilityId> {
  @Description('Tipo de deficiência')
  public readonly type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;

  @Description('Grau de deficiência')
  public readonly degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;

  @Description('Data de início da deficiência')
  public readonly startDate: Date;

  @Description('Data de término da deficiência')
  public readonly endDate: Date;

  @Description('Categoria da deficiência')
  public readonly category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;

  @Description('Descrição da deficiência')
  public readonly description: string;

  @Description('Impacto diário da deficiência')
  public readonly dailyImpact: string;

  @Description('CID-10 associado à deficiência')
  public readonly cidTen: CidTenEntity;

  @Description('Período associado à deficiência')
  public readonly generalUrbanRetirementAnalysisPeriod: GeneralUrbanRetirementAnalysisPeriodEntity;

  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDisabilityEntity.name;

  public constructor(
    props: GeneralUrbanRetirementAnalysisPeriodDisabilityEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementAnalysisPeriodDisabilityId, props);
    this.type = props.type;
    this.degree = props.degree;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.category = props.category;
    this.description = props.description;
    this.dailyImpact = props.dailyImpact;
    this.cidTen = props.cidTen;
    this.generalUrbanRetirementAnalysisPeriod =
      props.generalUrbanRetirementAnalysisPeriod;
  }
}

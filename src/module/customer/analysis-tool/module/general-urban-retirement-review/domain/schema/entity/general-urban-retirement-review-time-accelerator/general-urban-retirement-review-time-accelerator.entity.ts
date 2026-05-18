import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity.props.interface';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementReviewTimeAcceleratorEntity extends BaseEntity<GeneralUrbanRetirementReviewTimeAcceleratorId> {
  @Description('Tipo de acelerador de tempo.')
  public readonly timeType: string;

  @Description('Nome da pessoa ou fonte do registro de tempo.')
  public readonly name: string | null;

  @Description('Instituição ou nome da empresa.')
  public readonly institution: string | null;

  @Description('Data de início do período.')
  public readonly periodStart: Date | null;

  @Description('Data de término do período.')
  public readonly periodEnd: Date | null;

  @Description('Indica se afeta a carência.')
  public readonly affectsQualifyingPeriod: boolean | null;

  @Description('Tempo ganho.')
  public readonly timeGained: string | null;

  @Description('Avaliação de viabilidade.')
  public readonly viability: string | null;

  @Description('Observação técnica.')
  public readonly technicalNote: string | null;

  @Description('Reconhecimento pelo INSS.')
  public readonly recognitionInss: string;

  @Description('Reconhecimento judicial.')
  public readonly recognitionJudicial: string;

  @Description('Concessão de aposentadoria urbana associada.')
  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewTimeAcceleratorEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewTimeAcceleratorId, props);

    this.timeType = props.timeType;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.name = props.name ?? null;
    this.institution = props.institution ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod ?? null;
    this.timeGained = props.timeGained ?? null;
    this.viability = props.viability ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.generalUrbanRetirementReview =
      props.generalUrbanRetirementReview ?? null;
  }
}

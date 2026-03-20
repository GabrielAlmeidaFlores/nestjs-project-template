import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity.props.interface';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class GeneralUrbanRetirementGrantTimeAcceleratorEntity extends BaseEntity<GeneralUrbanRetirementGrantTimeAcceleratorId> {
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
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementGrantTimeAcceleratorEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantTimeAcceleratorEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantTimeAcceleratorId, props);

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
    this.generalUrbanRetirementGrant =
      props.generalUrbanRetirementGrant ?? null;
  }
}

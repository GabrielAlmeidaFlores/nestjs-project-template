import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.entity.props.interface';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsTimeAcceleratorEntity extends BaseEntity<RetirementPlanningRgpsTimeAcceleratorId> {
  @Description(
    'Tipo de acelerador de tempo (ex.: trabalho informal, serviço militar).',
  )
  public readonly timeType: string;

  @Description('Nome da pessoa ou fonte do registro de tempo.')
  public readonly name: string | null;

  @Description('Instituição ou nome da empresa.')
  public readonly institution: string | null;

  @Description('Data de início do período.')
  public readonly periodStart: Date | null;

  @Description('Data de término do período.')
  public readonly periodEnd: Date | null;

  @Description('Indica se afeta a carência (período de qualificação).')
  public readonly affectsQualifyingPeriod: boolean | null;

  @Description(
    'Tempo ganho, expresso como string legível (ex.: "2 anos e 3 meses").',
  )
  public readonly timeGained: string | null;

  @Description('Avaliação de viabilidade (Alta/Média/Baixa).')
  public readonly viability: string | null;

  @Description('Observação técnica.')
  public readonly technicalNote: string | null;

  @Description('Planejamento previdenciário RGPS associado.')
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  protected readonly _type = RetirementPlanningRgpsTimeAcceleratorEntity.name;

  public constructor(
    props: RetirementPlanningRgpsTimeAcceleratorEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsTimeAcceleratorId, props);

    this.timeType = props.timeType;
    this.name = props.name ?? null;
    this.institution = props.institution ?? null;
    this.periodStart = props.periodStart ?? null;
    this.periodEnd = props.periodEnd ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod ?? null;
    this.timeGained = props.timeGained ?? null;
    this.viability = props.viability ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
  }
}

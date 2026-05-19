import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantResultEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity.props.interface';
import { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantResultEntity extends BaseEntity<SpecialRetirementGrantResultId> {
  @Description('Texto completo da análise.')
  public readonly specialRetirementGrantCompleteAnalysis: string | null;

  @Description('Markdown para download da análise completa.')
  public readonly specialRetirementGrantCompleteAnalysisDownload: string | null;

  @Description('Texto simplificado da análise.')
  public readonly specialRetirementGrantSimplifiedAnalysis: string | null;

  @Description(
    'JSON da first analysis (linha do tempo + diagnóstico + resumo).',
  )
  public readonly specialRetirementGrantFirstAnalysis: string | null;

  protected readonly _type = SpecialRetirementGrantResultEntity.name;

  public constructor(props: SpecialRetirementGrantResultEntityPropsInterface) {
    super(SpecialRetirementGrantResultId, props);
    this.specialRetirementGrantCompleteAnalysis =
      props.specialRetirementGrantCompleteAnalysis ?? null;
    this.specialRetirementGrantCompleteAnalysisDownload =
      props.specialRetirementGrantCompleteAnalysisDownload ?? null;
    this.specialRetirementGrantSimplifiedAnalysis =
      props.specialRetirementGrantSimplifiedAnalysis ?? null;
    this.specialRetirementGrantFirstAnalysis =
      props.specialRetirementGrantFirstAnalysis ?? null;
  }
}

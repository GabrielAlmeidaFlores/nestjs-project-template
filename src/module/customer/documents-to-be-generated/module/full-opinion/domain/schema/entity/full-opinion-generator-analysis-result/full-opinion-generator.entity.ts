import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FullOpinionGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.props.interface';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class FullOpinionGeneratorEntity extends BaseEntity<FullOpinionGeneratorId> {
  @Description('Análise completa do gerador de parecer completo.')
  public readonly fullOpinionGeneratorCompleteAnalysis: string | null;

  @Description('Análise simplificada do gerador de parecer completo.')
  public readonly fullOpinionGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type = FullOpinionGeneratorEntity.name;

  public constructor(props: FullOpinionGeneratorEntityPropsInterface) {
    super(FullOpinionGeneratorId, props);

    this.fullOpinionGeneratorCompleteAnalysis =
      props.fullOpinionGeneratorCompleteAnalysis ?? null;
    this.fullOpinionGeneratorSimplifiedAnalysis =
      props.fullOpinionGeneratorSimplifiedAnalysis ?? null;
  }
}

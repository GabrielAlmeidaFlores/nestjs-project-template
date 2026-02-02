import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InitialPetitionGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.entity.props.interface';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class InitialPetitionGeneratorEntity extends BaseEntity<InitialPetitionGeneratorId> {
  @Description('Análise completa do gerador de petição inicial.')
  public readonly initialPetitionGeneratorCompleteAnalysis: string | null;

  @Description('Análise simplificada do gerador de petição inicial.')
  public readonly initialPetitionGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type =
    InitialPetitionGeneratorEntity.name;

  public constructor(
    props: InitialPetitionGeneratorEntityPropsInterface,
  ) {
    super(InitialPetitionGeneratorId, props);

    this.initialPetitionGeneratorCompleteAnalysis =
      props.initialPetitionGeneratorCompleteAnalysis ?? null;
    this.initialPetitionGeneratorSimplifiedAnalysis =
      props.initialPetitionGeneratorSimplifiedAnalysis ?? null;
  }
}

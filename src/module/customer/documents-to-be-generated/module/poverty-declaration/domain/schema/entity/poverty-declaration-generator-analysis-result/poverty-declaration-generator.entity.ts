import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PovertyDeclarationGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.props.interface';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PovertyDeclarationGeneratorEntity extends BaseEntity<PovertyDeclarationGeneratorId> {
  @Description('Análise completa do gerador de declaração de hipossuficiência.')
  public readonly povertyDeclarationGeneratorCompleteAnalysis: string | null;

  protected readonly _type = PovertyDeclarationGeneratorEntity.name;

  public constructor(props: PovertyDeclarationGeneratorEntityPropsInterface) {
    super(PovertyDeclarationGeneratorId, props);
    this.povertyDeclarationGeneratorCompleteAnalysis =
      props.povertyDeclarationGeneratorCompleteAnalysis ?? null;
  }
}

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { FeeContractGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.props.interface';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class FeeContractGeneratorEntity extends BaseEntity<FeeContractGeneratorId> {
  @Description('Análise completa do gerador de contrato de honorários.')
  public readonly feeContractGeneratorCompleteAnalysis: string | null;

  protected readonly _type = FeeContractGeneratorEntity.name;

  public constructor(props: FeeContractGeneratorEntityPropsInterface) {
    super(FeeContractGeneratorId, props);
    this.feeContractGeneratorCompleteAnalysis =
      props.feeContractGeneratorCompleteAnalysis ?? null;
  }
}

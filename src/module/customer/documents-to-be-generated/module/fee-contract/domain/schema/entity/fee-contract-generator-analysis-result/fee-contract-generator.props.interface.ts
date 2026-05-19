import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';

export interface FeeContractGeneratorEntityPropsInterface extends BaseEntityPropsInterface<FeeContractGeneratorId> {
  feeContractGeneratorCompleteAnalysis?: string | null;
}

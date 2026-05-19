import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';

export interface PovertyDeclarationGeneratorEntityPropsInterface extends BaseEntityPropsInterface<PovertyDeclarationGeneratorId> {
  povertyDeclarationGeneratorCompleteAnalysis?: string | null;
}

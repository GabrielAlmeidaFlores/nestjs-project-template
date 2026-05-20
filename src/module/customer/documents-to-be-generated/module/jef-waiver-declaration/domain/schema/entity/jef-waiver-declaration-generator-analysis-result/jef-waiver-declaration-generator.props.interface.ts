import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';

export interface JefWaiverDeclarationGeneratorEntityPropsInterface extends BaseEntityPropsInterface<JefWaiverDeclarationGeneratorId> {
  jefWaiverDeclarationGeneratorCompleteAnalysis?: string | null;
}

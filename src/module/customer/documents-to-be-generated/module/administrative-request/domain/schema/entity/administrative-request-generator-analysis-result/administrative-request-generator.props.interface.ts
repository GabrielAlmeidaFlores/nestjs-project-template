import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';

export interface AdministrativeRequestGeneratorEntityPropsInterface extends BaseEntityPropsInterface<AdministrativeRequestGeneratorId> {
  administrativeRequestGeneratorCompleteAnalysis?: string | null;
  administrativeRequestGeneratorSimplifiedAnalysis?: string | null;
}

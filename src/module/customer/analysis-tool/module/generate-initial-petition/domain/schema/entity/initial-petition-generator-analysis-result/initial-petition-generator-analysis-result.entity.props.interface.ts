import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import { InitialPetitionGeneratorId } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';

export interface InitialPetitionGeneratorEntityPropsInterface
  extends BaseEntityPropsInterface<InitialPetitionGeneratorId> {
  initialPetitionGeneratorCompleteAnalysis?: string | null;
  initialPetitionGeneratorSimplifiedAnalysis?: string | null;
}

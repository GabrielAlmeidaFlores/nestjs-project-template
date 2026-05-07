import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AccidentAssistanceGrantCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/enum/accident-assistance-grant-category.enum';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

export interface AccidentAssistanceGrantEntityPropsInterface
  extends BaseEntityPropsInterface<AccidentAssistanceGrantId> {
  analysisToolClientId: AnalysisToolClientId;
  analysisName?: string | null;
  category?: AccidentAssistanceGrantCategoryEnum | null;
  accidentDate?: Date | null;
  hadPreviousTemporaryDisabilityAssistance?: boolean | null;
  sequelDescription?: string | null;
  associatedCidId?: string | null;
  accidentAssistanceGrantResultId?: AccidentAssistanceGrantResultId | null;
}

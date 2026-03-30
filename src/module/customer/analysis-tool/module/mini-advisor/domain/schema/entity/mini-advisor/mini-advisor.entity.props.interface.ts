import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import type { ClientGenderEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import type { ClientSituationEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import type { ClientWorkHistoryTypeEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import type { HasContributedWithInssEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/has-contributed-with-inss.enum';
import type { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

export interface MiniAdvisorEntityPropsInterface extends BaseEntityPropsInterface<MiniAdvisorId> {
  analysisToolClientId: AnalysisToolClientId;
  clientSituation: ClientSituationEnum;
  clientAge: number;
  clientGender: ClientGenderEnum;
  clientWorkHistory: ClientWorkHistoryTypeEnum[];
  hasContributedWithInss: HasContributedWithInssEnum;
  clientHasDisabilityOrLimitations: boolean;
  miniAdvisorResult?: MiniAdvisorResultEntity | null;
}

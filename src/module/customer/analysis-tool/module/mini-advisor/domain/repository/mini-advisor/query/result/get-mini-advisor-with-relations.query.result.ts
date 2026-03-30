import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { ClientGenderEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import { HasContributedWithInssEnum } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/enum/has-contributed-with-inss.enum';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { GetMiniAdvisorResultQueryResult } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetMiniAdvisorWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MiniAdvisorId;
  public readonly analysisToolClientId: AnalysisToolClientId;
  public readonly clientSituation: ClientSituationEnum;
  public readonly clientAge: number;
  public readonly clientGender: ClientGenderEnum;
  public readonly clientWorkHistory: ClientWorkHistoryTypeEnum[];
  public readonly hasContributedWithInss: HasContributedWithInssEnum;
  public readonly clientHasDisabilityOrLimitations: boolean;
  public readonly miniAdvisorResult: GetMiniAdvisorResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetMiniAdvisorWithRelationsQueryResult.name;
}

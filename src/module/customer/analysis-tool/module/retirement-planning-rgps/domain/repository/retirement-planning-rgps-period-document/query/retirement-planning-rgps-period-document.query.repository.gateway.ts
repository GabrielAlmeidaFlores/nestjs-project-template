import type { GetRetirementPlanningRgpsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/query/result/get-retirement-planning-rgps-period-document.query.result';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import type { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRgpsPeriodDocumentQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsPeriodDocumentIdOrFail(
    id: RetirementPlanningRgpsPeriodDocumentId,
    err: ConstructorType<Error>,
  ): Promise<GetRetirementPlanningRgpsPeriodDocumentQueryResult>;

  public abstract findByRetirementPlanningRgpsPeriodId(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodDocumentQueryResult[]>;
}

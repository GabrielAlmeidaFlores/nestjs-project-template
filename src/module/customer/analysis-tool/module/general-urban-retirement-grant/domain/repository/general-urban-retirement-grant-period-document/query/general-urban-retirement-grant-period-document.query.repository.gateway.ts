import type { NotFoundError } from '@core/error/not-found.error';
import type { GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/query/result/get-general-urban-retirement-grant-period-document.query.result';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import type { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class GeneralUrbanRetirementGrantPeriodDocumentQueryRepositoryGateway {
  public abstract findOneByGeneralUrbanRetirementGrantPeriodDocumentIdOrFail(
    id: GeneralUrbanRetirementGrantPeriodDocumentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult>;

  public abstract findByGeneralUrbanRetirementGrantPeriodId(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult[]>;
}

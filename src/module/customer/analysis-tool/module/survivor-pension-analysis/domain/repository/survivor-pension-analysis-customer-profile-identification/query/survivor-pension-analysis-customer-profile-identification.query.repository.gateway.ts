import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/result/get-survivor-pension-analysis-customer-profile-identification.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway {
  public abstract findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult | null>;

  public abstract findOneById(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult>;
}

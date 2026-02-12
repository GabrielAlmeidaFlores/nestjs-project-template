import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway {
  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult>
  >;

  public abstract findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult>;
}

import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetJudicialCaseAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-with-relations.query.result';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class JudicialCaseAnalysisQueryRepositoryGateway {
  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetJudicialCaseAnalysisWithRelationsQueryResult>
  >;

  public abstract findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetJudicialCaseAnalysisWithRelationsQueryResult>;
}

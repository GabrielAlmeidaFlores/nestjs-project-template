import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AnalysisToolClientQueryRepositoryGateway {
  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientWithRelationsQueryResult>
  >;

  public abstract findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult>;

  public abstract findOneByEmailAndOrganizationId(
    email: Email,
    organizationId: OrganizationId,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult | null>;

  public abstract findOneByFederalDocumentAndOrganizationId(
    federalDocument: FederalDocument,
    organizationId: OrganizationId,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult | null>;
}

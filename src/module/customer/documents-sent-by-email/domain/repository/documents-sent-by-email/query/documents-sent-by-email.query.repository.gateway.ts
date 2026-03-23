import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListDocumentsSentByEmailQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/param/list-documents-sent-by-email.query.param.gateway';
import type { GetDocumentsSentByEmailQueryResult } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/result/get-documents-sent-by-email.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class DocumentsSentByEmailQueryRepositoryGateway {
  public abstract listDocumentsSentByEmailByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListDocumentsSentByEmailQueryParamGateway,
  ): Promise<ListDataOutputModel<GetDocumentsSentByEmailQueryResult>>;
}

import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { ListEmailTemplatesQueryParamGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/param/list-email-templates.query.param.gateway';
import type { GetEmailTemplateQueryResult } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/result/get-email-template.query.result';
import type { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class EmailTemplateQueryRepositoryGateway {
  public abstract listEmailTemplatesByOwnerId(
    ownerId: OrganizationMemberId,
    listData: ListEmailTemplatesQueryParamGateway,
  ): Promise<ListDataOutputModel<GetEmailTemplateQueryResult>>;

  public abstract countActiveEmailTemplatesByOwnerId(
    ownerId: OrganizationMemberId,
  ): Promise<number>;

  public abstract findOneEmailTemplateByIdAndOwnerIdOrFail(
    id: EmailTemplateId,
    ownerId: OrganizationMemberId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetEmailTemplateQueryResult>;
}

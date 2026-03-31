import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetOrganizationCustomizationDocumentFooterTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/result/get-organization-customization-document-footer-template.query.result';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

export abstract class OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway {
  public abstract listOrganizationCustomizationDocumentFooterTemplates(
    pagination: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationCustomizationDocumentFooterTemplateQueryResult>
  >;

  public abstract findOneOrganizationCustomizationDocumentFooterTemplateById(
    id: OrganizationCustomizationDocumentFooterTemplateId,
  ): Promise<GetOrganizationCustomizationDocumentFooterTemplateQueryResult | null>;
}

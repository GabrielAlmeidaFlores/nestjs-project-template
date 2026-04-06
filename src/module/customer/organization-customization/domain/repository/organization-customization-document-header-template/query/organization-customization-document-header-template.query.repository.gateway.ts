import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetOrganizationCustomizationDocumentHeaderTemplateQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/result/get-organization-customization-document-header-template.query.result';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export abstract class OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway {
  public abstract listOrganizationCustomizationDocumentHeaderTemplates(
    pagination: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationCustomizationDocumentHeaderTemplateQueryResult>
  >;

  public abstract findOneOrganizationCustomizationDocumentHeaderTemplateById(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
  ): Promise<GetOrganizationCustomizationDocumentHeaderTemplateQueryResult | null>;
}

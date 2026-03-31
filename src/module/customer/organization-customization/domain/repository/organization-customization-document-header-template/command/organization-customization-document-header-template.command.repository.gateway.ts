import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCustomizationDocumentHeaderTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity';
import type { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

export abstract class OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway {
  public abstract createOrganizationCustomizationDocumentHeaderTemplate(
    props: OrganizationCustomizationDocumentHeaderTemplateEntity,
  ): TransactionType;

  public abstract updateOrganizationCustomizationDocumentHeaderTemplate(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
    props: OrganizationCustomizationDocumentHeaderTemplateEntity,
  ): TransactionType;
}

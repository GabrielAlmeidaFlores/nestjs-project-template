import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCustomizationDocumentFooterTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/organization-customization-document-footer-template.entity';
import type { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

export abstract class OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway {
  public abstract createOrganizationCustomizationDocumentFooterTemplate(
    props: OrganizationCustomizationDocumentFooterTemplateEntity,
  ): TransactionType;

  public abstract updateOrganizationCustomizationDocumentFooterTemplate(
    id: OrganizationCustomizationDocumentFooterTemplateId,
    props: OrganizationCustomizationDocumentFooterTemplateEntity,
  ): TransactionType;
}

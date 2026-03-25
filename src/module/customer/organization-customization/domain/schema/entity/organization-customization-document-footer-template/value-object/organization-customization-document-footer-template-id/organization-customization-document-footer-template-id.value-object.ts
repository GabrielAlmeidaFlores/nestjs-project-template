import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCustomizationDocumentFooterTemplateId extends Guid {
  protected override readonly _type =
    OrganizationCustomizationDocumentFooterTemplateId.name;
}

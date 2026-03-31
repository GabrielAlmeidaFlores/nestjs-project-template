import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationCustomizationDocumentHeaderTemplateNotFoundError extends NotFoundError {
  protected override readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateNotFoundError.name;

  public constructor() {
    super('Template de cabeçalho de documento não encontrado.');
  }
}

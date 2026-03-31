import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationCustomizationDocumentFooterTemplateNotFoundError extends NotFoundError {
  protected override readonly _type =
    OrganizationCustomizationDocumentFooterTemplateNotFoundError.name;

  public constructor() {
    super('Template de rodapé de documento não encontrado.');
  }
}

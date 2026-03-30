import { Inject, Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';

import type { ExportDocumentDownloadOptionsInterface } from '@module/customer/analysis-tool/lib/export-document/export-document-download-options.interface';

@Injectable()
export class OrganizationCustomizationExportDocumentOptionsResolver {
  protected readonly _type =
    OrganizationCustomizationExportDocumentOptionsResolver.name;

  public constructor(
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepositoryGateway: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly organizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly organizationCustomizationDocumentFooterTemplateQueryRepositoryGateway: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
  ): Promise<ExportDocumentDownloadOptionsInterface> {
    const customization =
      await this.organizationCustomizationQueryRepositoryGateway.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      );

    if (!customization) {
      return {};
    }

    const [headerTemplate, footerTemplate] = await Promise.all([
      this.organizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway.findOneOrganizationCustomizationDocumentHeaderTemplateById(
        customization.organizationCustomizationDocumentHeaderTemplateId,
      ),
      this.organizationCustomizationDocumentFooterTemplateQueryRepositoryGateway.findOneOrganizationCustomizationDocumentFooterTemplateById(
        customization.organizationCustomizationDocumentFooterTemplateId,
      ),
    ]);

    let logoDataUrl = '';
    try {
      if (customization.organizationLogo !== null) {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          customization.organizationLogo,
        );
        const metadata = await fileType.fileTypeFromBuffer(buffer);
        const mimeType = metadata?.mime ?? 'image/png';

        const base64 = buffer.toString('base64');
        logoDataUrl = `data:${mimeType};base64,${base64}`;
      }
    } catch {
      logoDataUrl = '';
    }

    const variables: Record<string, string> = {
      organizationName: customization.organizationName,
      logo: logoDataUrl,
      primaryColor: customization.primaryColor,
      secondaryColor: customization.secondaryColor,
      tertiaryColor: customization.tertiaryColor,
      footerDescription:
        customization.organizationCustomizationDocumentFooterDescription ?? '',
    };

    const headerHtmlContent = headerTemplate?.htmlContent.trim();
    const footerHtmlContent = footerTemplate?.htmlContent.trim();

    const result: ExportDocumentDownloadOptionsInterface = {};
    if (headerTemplate !== null) {
      result.headerTemplateType = headerTemplate.type;
    }
    if (footerTemplate !== null) {
      result.footerTemplateType = footerTemplate.type;
    }
    if (headerHtmlContent !== undefined && headerHtmlContent !== '') {
      result.headerHtml = this.renderTemplatePlaceholders(
        headerHtmlContent,
        variables,
      );
    }
    if (footerHtmlContent !== undefined && footerHtmlContent !== '') {
      result.footerHtml = this.renderTemplatePlaceholders(
        footerHtmlContent,
        variables,
      );
    }

    return result;
  }

  private renderTemplatePlaceholders(
    html: string,
    variables: Record<string, string>,
  ): string {
    let rendered = html;

    for (const [key, rawValue] of Object.entries(variables)) {
      const safeValue = this.escapeHtml(rawValue);
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      rendered = rendered.replace(regex, safeValue);
    }

    rendered = rendered.replace(/{{\s*[\w]+\s*}}/g, '');

    return rendered;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
      .replaceAll('\n', '<br>');
  }
}

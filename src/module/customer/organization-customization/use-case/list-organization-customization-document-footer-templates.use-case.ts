import fs from 'node:fs';

import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentFooterTemplateResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization-document-footer-template.response.dto';
import { ListOrganizationCustomizationDocumentFooterTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-footer-templates.response.dto';
import { ImageApplicationVariable } from '@shared/system/constant/application-variable/source/image.application-variable';

@Injectable()
export class ListOrganizationCustomizationDocumentFooterTemplatesUseCase {
  protected readonly _type =
    ListOrganizationCustomizationDocumentFooterTemplatesUseCase.name;

  private readonly DEFAULT_PRIMARY_COLOR: string;
  private readonly DEFAULT_SECONDARY_COLOR: string;
  private readonly DEFAULT_TERTIARY_COLOR: string;
  private _defaultLogoBase64DataUri: string | null;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly footerTemplateQueryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {
    this.DEFAULT_PRIMARY_COLOR = '#2D77B1';
    this.DEFAULT_SECONDARY_COLOR = '#8DCBED';
    this.DEFAULT_TERTIARY_COLOR = '#2D77B1';
    this._defaultLogoBase64DataUri = null;
  }

  public async execute(
    pagination: ListDataInputModel,
    organizationId: OrganizationId,
  ): Promise<ListOrganizationCustomizationDocumentFooterTemplatesResponseDto> {
    const [result, customization, organization] = await Promise.all([
      this.footerTemplateQueryRepository.listOrganizationCustomizationDocumentFooterTemplates(
        pagination,
      ),
      this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      ),
      this.organizationQueryRepository.findOneByOrganizationId(organizationId),
    ]);

    const logoUrl = await this.resolveLogoUrl(customization);
    const primaryColor =
      customization?.primaryColor ?? this.DEFAULT_PRIMARY_COLOR;
    const secondaryColor =
      customization?.secondaryColor ?? this.DEFAULT_SECONDARY_COLOR;
    const tertiaryColor =
      customization?.tertiaryColor ?? this.DEFAULT_TERTIARY_COLOR;

    const resource = result.resource.map((item) => {
      const htmlContent = item.htmlContent
        .replace(/\{\{logo\}\}/g, logoUrl)
        .replace(/\{\{organizationName\}\}/g, organization?.name ?? '')
        .replace(/\{\{primaryColor\}\}/g, primaryColor)
        .replace(/\{\{secondaryColor\}\}/g, secondaryColor)
        .replace(/\{\{tertiaryColor\}\}/g, tertiaryColor)
        .replace(
          /\{\{footerDescription\}\}/g,
          customization?.organizationCustomizationDocumentFooterDescription ??
            '',
        );

      return GetOrganizationCustomizationDocumentFooterTemplateResponseDto.build(
        {
          organizationCustomizationDocumentFooterTemplateId:
            item.organizationCustomizationDocumentFooterTemplateId,
          type: item.type,
          htmlContent,
          createdAt: item.createdAt,
        },
      );
    });

    return ListOrganizationCustomizationDocumentFooterTemplatesResponseDto.build(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        amountItemsCurrentPage: result.amountItemsCurrentPage,
        resource,
      },
    );
  }

  private async resolveLogoUrl(
    customization: Awaited<
      ReturnType<
        typeof this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId
      >
    >,
  ): Promise<string> {
    if (customization === null) {
      return this.getDefaultLogoBase64DataUri();
    }

    if (customization.organizationLogo === null) {
      return '';
    }

    return (
      await this.fileProcessorGateway.getOrganizationLogo(
        customization.organizationLogo,
      )
    ).toString();
  }

  private getDefaultLogoBase64DataUri(): string {
    if (this._defaultLogoBase64DataUri === null) {
      const base64 = Base64.encodeBuffer(
        fs.readFileSync(ImageApplicationVariable.IMAGE_AGILIZA_LOGO_PATH),
      );
      this._defaultLogoBase64DataUri = `data:image/svg+xml;base64,${base64.toString()}`;
    }

    return this._defaultLogoBase64DataUri;
  }
}

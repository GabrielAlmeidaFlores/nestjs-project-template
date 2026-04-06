import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import { PatchOrganizationCustomizationRequestDto } from '@module/customer/organization-customization/dto/request/patch-organization-customization.request.dto';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { OrganizationCustomizationDocumentFooterTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-footer-template-not-found.error';
import { OrganizationCustomizationDocumentHeaderTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-header-template-not-found.error';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class PatchOrganizationCustomizationUseCase {
  protected readonly _type = PatchOrganizationCustomizationUseCase.name;

  public constructor(
    @Inject(OrganizationCommandRepositoryGateway)
    private readonly organizationCommandRepository: OrganizationCommandRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(OrganizationCustomizationCommandRepositoryGateway)
    private readonly organizationCustomizationCommandRepository: OrganizationCustomizationCommandRepositoryGateway,
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly footerTemplateQueryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly headerTemplateQueryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    dto: PatchOrganizationCustomizationRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    const [organization, existing] = await Promise.all([
      this.organizationQueryRepository.findOneByOrganizationId(organizationId),
      this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      ),
    ]);

    if (!existing) {
      throw new OrganizationCustomizationNotFoundError();
    }

    await this.validateTemplatesExist(dto);

    const updatedCustomization = new OrganizationCustomizationEntity({
      id: existing.organizationCustomizationId,
      organizationId: existing.organizationId,
      organizationLogo: existing.organizationLogo,
      organizationCustomizationDocumentFooterDescription:
        dto.organizationCustomizationDocumentFooterDescription ??
        existing.organizationCustomizationDocumentFooterDescription,
      organizationCustomizationDocumentHeaderTemplateId:
        dto.organizationCustomizationDocumentHeaderTemplateId ??
        existing.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentFooterTemplateId:
        dto.organizationCustomizationDocumentFooterTemplateId ??
        existing.organizationCustomizationDocumentFooterTemplateId,
      primaryColor: dto.primaryColor
        ? new ColorValue(dto.primaryColor.toString())
        : new ColorValue(existing.primaryColor),
      secondaryColor: dto.secondaryColor
        ? new ColorValue(dto.secondaryColor.toString())
        : new ColorValue(existing.secondaryColor),
      tertiaryColor: dto.tertiaryColor
        ? new ColorValue(dto.tertiaryColor.toString())
        : new ColorValue(existing.tertiaryColor),
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
    });

    const operations = [
      this.organizationCustomizationCommandRepository.updateOrganizationCustomization(
        new OrganizationCustomizationId(
          existing.organizationCustomizationId.toString(),
        ),
        updatedCustomization,
      ),
    ];

    if (dto.organizationName !== undefined && organization !== null) {
      const updatedOrganization = new OrganizationEntity({
        id: organization.id,
        name: dto.organizationName,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      });

      operations.push(
        this.organizationCommandRepository.updateOrganization(
          organizationId,
          updatedOrganization,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(operations);

    await transaction.commit();

    const result =
      await this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      );

    if (!result) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const [organizationLogoSignedUrl, organizationLogoOriginalFileName] =
      result.organizationLogo !== null
        ? await Promise.all([
            this.fileProcessorGateway
              .getOrganizationLogo(result.organizationLogo)
              .then((url) => url.toString()),
            this.fileProcessorGateway.getOriginalFileName(
              result.organizationLogo,
            ),
          ])
        : [null, null];

    return GetOrganizationCustomizationResponseDto.build({
      organizationCustomizationId: result.organizationCustomizationId,
      organizationName: result.organizationName,
      ...(organizationLogoSignedUrl !== null && {
        organizationLogo: organizationLogoSignedUrl,
      }),
      ...(organizationLogoOriginalFileName !== null && {
        organizationLogoOriginalFileName,
      }),
      organizationCustomizationDocumentFooterDescription:
        result.organizationCustomizationDocumentFooterDescription,
      organizationCustomizationDocumentHeaderTemplateId:
        result.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentHeaderTemplateType:
        result.organizationCustomizationDocumentHeaderTemplateType,
      organizationCustomizationDocumentFooterTemplateId:
        result.organizationCustomizationDocumentFooterTemplateId,
      organizationCustomizationDocumentFooterTemplateType:
        result.organizationCustomizationDocumentFooterTemplateType,
      primaryColor: result.primaryColor,
      secondaryColor: result.secondaryColor,
      tertiaryColor: result.tertiaryColor,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async validateTemplatesExist(
    dto: PatchOrganizationCustomizationRequestDto,
  ): Promise<void> {
    if (dto.organizationCustomizationDocumentHeaderTemplateId !== undefined) {
      const headerTemplate =
        await this.headerTemplateQueryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
          dto.organizationCustomizationDocumentHeaderTemplateId,
        );

      if (headerTemplate === null) {
        throw new OrganizationCustomizationDocumentHeaderTemplateNotFoundError();
      }
    }

    if (dto.organizationCustomizationDocumentFooterTemplateId !== undefined) {
      const footerTemplate =
        await this.footerTemplateQueryRepository.findOneOrganizationCustomizationDocumentFooterTemplateById(
          dto.organizationCustomizationDocumentFooterTemplateId,
        );

      if (footerTemplate === null) {
        throw new OrganizationCustomizationDocumentFooterTemplateNotFoundError();
      }
    }
  }
}

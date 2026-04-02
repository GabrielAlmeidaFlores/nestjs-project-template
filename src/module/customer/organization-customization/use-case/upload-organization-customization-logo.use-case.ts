import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';
import { UploadOrganizationCustomizationLogoRequestDto } from '@module/customer/organization-customization/dto/request/upload-organization-customization-logo.request.dto';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class UploadOrganizationCustomizationLogoUseCase {
  protected readonly _type = UploadOrganizationCustomizationLogoUseCase.name;

  public constructor(
    @Inject(OrganizationCustomizationCommandRepositoryGateway)
    private readonly organizationCustomizationCommandRepository: OrganizationCustomizationCommandRepositoryGateway,
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    dto: UploadOrganizationCustomizationLogoRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    const existing =
      await this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      );

    if (!existing) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const organizationLogoLocation =
      await this.fileProcessorGateway.uploadOrganizationLogo(
        dto.organizationLogo,
        existing.organizationLogo ?? undefined,
      );

    const updated = new OrganizationCustomizationEntity({
      id: existing.organizationCustomizationId,
      organizationId: existing.organizationId,
      organizationLogo: organizationLogoLocation,
      organizationCustomizationDocumentFooterDescription:
        existing.organizationCustomizationDocumentFooterDescription,
      organizationCustomizationDocumentHeaderTemplateId:
        existing.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentFooterTemplateId:
        existing.organizationCustomizationDocumentFooterTemplateId,
      primaryColor: new ColorValue(existing.primaryColor),
      secondaryColor: new ColorValue(existing.secondaryColor),
      tertiaryColor: new ColorValue(existing.tertiaryColor),
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationCustomizationCommandRepository.updateOrganizationCustomization(
        new OrganizationCustomizationId(
          existing.organizationCustomizationId.toString(),
        ),
        updated,
      ),
    ]);

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
}

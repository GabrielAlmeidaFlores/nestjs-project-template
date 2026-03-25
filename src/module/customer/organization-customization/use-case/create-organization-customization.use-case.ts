import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { CreateOrganizationCustomizationRequestDto } from '@module/customer/organization-customization/dto/request/create-organization-customization.request.dto';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class CreateOrganizationCustomizationUseCase {
  protected readonly _type = CreateOrganizationCustomizationUseCase.name;

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
    dto: CreateOrganizationCustomizationRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    const organizationLogoLocation =
      await this.fileProcessorGateway.uploadOrganizationLogoFromBase64(
        dto.organizationLogo,
      );

    const entity = new OrganizationCustomizationEntity({
      organizationId,
      organizationLogo: organizationLogoLocation,
      organizationCustomizationDocumentFooterDescription:
        dto.organizationCustomizationDocumentFooterDescription ?? null,
      organizationCustomizationDocumentHeaderTemplateId:
        dto.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentFooterTemplateId:
        dto.organizationCustomizationDocumentFooterTemplateId,
      primaryColor: new ColorValue(dto.primaryColor.toString()),
      secondaryColor: new ColorValue(dto.secondaryColor.toString()),
      tertiaryColor: new ColorValue(dto.tertiaryColor.toString()),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationCustomizationCommandRepository.createOrganizationCustomization(
        entity,
      ),
    ]);

    await transaction.commit();

    const created =
      await this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationById(
        entity.id,
      );

    if (!created) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const organizationLogoSignedUrl =
      await this.fileProcessorGateway.getOrganizationLogo(
        created.organizationLogo,
      );

    return GetOrganizationCustomizationResponseDto.build({
      organizationCustomizationId: created.organizationCustomizationId,
      organizationLogo: organizationLogoSignedUrl.toString(),
      organizationCustomizationDocumentFooterDescription:
        created.organizationCustomizationDocumentFooterDescription,
      organizationCustomizationDocumentHeaderTemplateId:
        created.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentHeaderTemplateType:
        created.organizationCustomizationDocumentHeaderTemplateType,
      organizationCustomizationDocumentFooterTemplateId:
        created.organizationCustomizationDocumentFooterTemplateId,
      organizationCustomizationDocumentFooterTemplateType:
        created.organizationCustomizationDocumentFooterTemplateType,
      primaryColor: created.primaryColor,
      secondaryColor: created.secondaryColor,
      tertiaryColor: created.tertiaryColor,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }
}

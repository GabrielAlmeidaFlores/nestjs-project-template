import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ColorValue } from '@core/domain/schema/value-object/color/color.value-object';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { OrganizationCustomizationCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/command/organization-customization.command.repository.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import { CreateOrganizationCustomizationRequestDto } from '@module/customer/organization-customization/dto/request/create-organization-customization.request.dto';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { OrganizationCustomizationDocumentFooterTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-footer-template-not-found.error';
import { OrganizationCustomizationDocumentHeaderTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-header-template-not-found.error';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class CreateOrganizationCustomizationUseCase {
  protected readonly _type = CreateOrganizationCustomizationUseCase.name;

  public constructor(
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
    @Inject(OrganizationCommandRepositoryGateway)
    private readonly organizationCommandRepository: OrganizationCommandRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    dto: CreateOrganizationCustomizationRequestDto,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    await this.validateTemplatesExist(dto);

    const entity = new OrganizationCustomizationEntity({
      organizationId,
      organizationLogo: null,
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

    const transactionOperations = [
      this.organizationCustomizationCommandRepository.createOrganizationCustomization(
        entity,
      ),
    ];

    if (dto.organizationName !== undefined) {
      const organization =
        await this.organizationQueryRepository.findOneByOrganizationId(
          organizationId,
        );

      if (!organization) {
        throw new OrganizationNotFoundError();
      }

      const updatedOrg = new OrganizationEntity({
        id: organizationId,
        name: dto.organizationName,
      });

      transactionOperations.push(
        this.organizationCommandRepository.updateOrganization(
          organizationId,
          updatedOrg,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    const created =
      await this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationById(
        entity.id,
      );

    if (!created) {
      throw new OrganizationCustomizationNotFoundError();
    }

    return GetOrganizationCustomizationResponseDto.build({
      organizationCustomizationId: created.organizationCustomizationId,
      organizationName: created.organizationName,
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

  private async validateTemplatesExist(
    dto: CreateOrganizationCustomizationRequestDto,
  ): Promise<void> {
    const [headerTemplate, footerTemplate] = await Promise.all([
      this.headerTemplateQueryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
        dto.organizationCustomizationDocumentHeaderTemplateId,
      ),
      this.footerTemplateQueryRepository.findOneOrganizationCustomizationDocumentFooterTemplateById(
        dto.organizationCustomizationDocumentFooterTemplateId,
      ),
    ]);

    if (!headerTemplate) {
      throw new OrganizationCustomizationDocumentHeaderTemplateNotFoundError();
    }

    if (!footerTemplate) {
      throw new OrganizationCustomizationDocumentFooterTemplateNotFoundError();
    }
  }
}

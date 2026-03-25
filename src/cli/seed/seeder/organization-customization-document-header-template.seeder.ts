import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/command/organization-customization-document-header-template.command.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import { OrganizationCustomizationDocumentHeaderTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const ORGANIZATION_CUSTOMIZATION_DOCUMENT_HEADER_TEMPLATE_SEED_DATA: OrganizationCustomizationDocumentHeaderTemplateEntity[] =
  [
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        'a1b2c3d4-e5f6-4a7b-8c9d-000000000001',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN,
      htmlContent:
        '<header class="header-modern"><img src="{{logo}}" alt="Logo" /><h1>{{organizationName}}</h1></header>',
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        'a1b2c3d4-e5f6-4a7b-8c9d-000000000002',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.CLASSIC,
      htmlContent:
        '<header class="header-classic"><h1>{{organizationName}}</h1><img src="{{logo}}" alt="Logo" /></header>',
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        'a1b2c3d4-e5f6-4a7b-8c9d-000000000003',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.STANDOUT_CLASSIC,
      htmlContent:
        '<header class="header-standout-classic" style="background-color:{{primaryColor}}"><img src="{{logo}}" alt="Logo" /><h1>{{organizationName}}</h1></header>',
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        'a1b2c3d4-e5f6-4a7b-8c9d-000000000004',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN_STANDOUT,
      htmlContent:
        '<header class="header-modern-standout" style="background-color:{{primaryColor}};color:{{secondaryColor}}"><img src="{{logo}}" alt="Logo" /><h1>{{organizationName}}</h1></header>',
    }),
  ];

export class OrganizationCustomizationDocumentHeaderTemplateSeeder implements SeederInterface {
  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateSeeder.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway,
    )
    private readonly commandRepository: OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly queryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    for (const templateData of ORGANIZATION_CUSTOMIZATION_DOCUMENT_HEADER_TEMPLATE_SEED_DATA) {
      const existing =
        await this.queryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
          templateData.id,
        );

      if (existing) {
        continue;
      }

      transactions.push(
        this.commandRepository.createOrganizationCustomizationDocumentHeaderTemplate(
          templateData,
        ),
      );
    }

    return transactions;
  }
}

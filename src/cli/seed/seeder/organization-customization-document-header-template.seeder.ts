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
        '9ae34abf-a3df-4972-9885-67204fa64e41',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN,
      htmlContent: `<header style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:3px solid {{primaryColor}}">
  <img src="{{logo}}" alt="Logo" style="height:48px;object-fit:contain" />
  <span style="font-size:20px;font-weight:600;color:{{primaryColor}}">{{organizationName}}</span>
</header>`,
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        '255ef03e-34f2-4358-963e-b26c60a17c1b',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.CLASSIC,
      htmlContent: `<header style="display:flex;flex-direction:column;align-items:center;padding:16px 32px;border-bottom:1px solid {{secondaryColor}}">
  <img src="{{logo}}" alt="Logo" style="height:56px;object-fit:contain;margin-bottom:8px" />
  <h1 style="font-size:18px;font-weight:700;color:{{primaryColor}};margin:0">{{organizationName}}</h1>
</header>`,
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        '2fdb0e7e-9c28-4180-a14f-be72447c0536',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.STANDOUT_CLASSIC,
      htmlContent: `<header style="display:flex;flex-direction:column;align-items:center;padding:20px 32px;background-color:{{primaryColor}}">
  <img src="{{logo}}" alt="Logo" style="height:56px;object-fit:contain;margin-bottom:8px" />
  <h1 style="font-size:18px;font-weight:700;color:{{secondaryColor}};margin:0">{{organizationName}}</h1>
</header>`,
    }),
    new OrganizationCustomizationDocumentHeaderTemplateEntity({
      id: new OrganizationCustomizationDocumentHeaderTemplateId(
        '7c6d980a-c548-4c8f-952c-15f7db49eb39',
      ),
      type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN_STANDOUT,
      htmlContent: `<header style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background-color:{{primaryColor}}">
  <img src="{{logo}}" alt="Logo" style="height:48px;object-fit:contain" />
  <span style="font-size:20px;font-weight:600;color:{{secondaryColor}}">{{organizationName}}</span>
  <div style="width:8px;height:40px;background-color:{{tertiaryColor}};border-radius:4px"></div>
</header>`,
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

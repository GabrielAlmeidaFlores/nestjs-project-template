import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/command/organization-customization-document-header-template.command.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';
import { OrganizationCustomizationDocumentHeaderTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export class OrganizationCustomizationDocumentHeaderTemplateSeeder implements SeederInterface {
  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateSeeder.name;

  private readonly seedData: OrganizationCustomizationDocumentHeaderTemplateEntity[];

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway,
    )
    private readonly commandRepository: OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly queryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
  ) {
    this.seedData = [
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '9ae34abf-a3df-4972-9885-67204fa64e41',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN,
        htmlContent: `<header style="display: flex; width: 100%; justify-content: center; padding: 40px 20px; font-family: sans-serif;">
  <div style="display: flex; flex-direction: column; align-items: center; width: min-content;">
    <img src="{{logo}}" alt="{{organizationName}}" style="width: 80%; max-width: 200px; height: auto; margin-bottom: 10px; display: block;">
    <span style="font-size: 24px; font-weight: bold; white-space: nowrap; color: {{primaryColor}}">
      {{organizationName}}
    </span>
  </div>
</header>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '255ef03e-34f2-4358-963e-b26c60a17c1b',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.CLASSIC,
        htmlContent: `<header>
  <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 40px 00px; font-family: sans-serif; box-sizing: border-box; border-bottom: 4px solid {{primaryColor}};">
    <img src="{{logo}}" alt="{{organizationName}}" style="width: 80%; max-width: 200px; height: auto; margin-bottom: 10px; display: block;">
    <span style="font-size: 24px; font-weight: bold; white-space: nowrap; color: {{primaryColor}}">
      {{organizationName}}
    </span>
  </div>
</header>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '2fdb0e7e-9c28-4180-a14f-be72447c0536',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.STANDOUT_CLASSIC,
        htmlContent: `<header>
  <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 40px 00px; font-family: sans-serif; box-sizing: border-box; border-bottom: 4px solid {{secondaryColor}}; background-color: {{primaryColor}}">
    <img src="{{logo}}" alt="{{organizationName}}" style="width: 80%; max-width: 200px; height: auto; margin-bottom: 10px; display: block;">
    <span style="font-size: 24px; font-weight: bold; white-space: nowrap; color: {{secondaryColor}}">
      {{organizationName}}
    </span>
  </div>
</header>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '7c6d980a-c548-4c8f-952c-15f7db49eb39',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN_STANDOUT,
        htmlContent: `<header style="display: flex; width: 100%; justify-content: center; padding: 40px 20px; font-family: sans-serif; background: {{primaryColor}};">
  <div style="display: flex; flex-direction: column; align-items: center; width: min-content;">
    <img src="{{logo}}" alt="{{organizationName}}" style="width: 80%; max-width: 200px; height: auto; margin-bottom: 10px; display: block;">
    <span style="font-size: 24px; font-weight: bold; white-space: nowrap; color: {{secondaryColor}}">
      {{organizationName}}
    </span>
  </div>
</header>`,
      }),
    ];
  }

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    for (const templateData of this.seedData) {
      const existing =
        await this.queryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
          templateData.id,
        );

      if (existing) {
        transactions.push(
          this.commandRepository.updateOrganizationCustomizationDocumentHeaderTemplate(
            templateData.id,
            templateData,
          ),
        );
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

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
        htmlContent: `<header><table style="width: 100%;font-family: sans-serif;"><tr><td style="text-align: center;"><p align="center"><img src="{{logo}}"alt="{{organizationName}}"style="height: auto; width: 130px;"/></p><div style="font-size: 20px;font-weight: 300;color: {{secondaryColor}}; margin: 0;">{{organizationName}}</div></td></tr></table></header>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '255ef03e-34f2-4358-963e-b26c60a17c1b',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.CLASSIC,
        htmlContent: `<header>
          <table
            style="width: 100%;border-bottom: 4px solid {{primaryColor}};font-family: sans-serif;"
          >
            <tr>
              <td style="width: 50%; text-align: left;">
                <img
                  src="{{logo}}"
                  alt="{{organizationName}}"
                  style="height: auto; width: 140px; padding: 0px 20px;"
                />
              </td>
              <td
                style="
                  width: 50%;
                  text-align: right;
                  vertical-align: middle;
                  padding: 0px 20px;"
              >
                <span
                  style="font-size: 20px; font-weight: 300; color: {{primaryColor}}"
                  >{{organizationName}}</span
                >
              </td>
            </tr>
          </table>
        </header>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '2fdb0e7e-9c28-4180-a14f-be72447c0536',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.STANDOUT_CLASSIC,
        htmlContent: `<div
  style="width:100%; box-sizing:border-box; font-size:10px; line-height:1.2; background-color: {{secondaryColor}}; -webkit-print-color-adjust: exact;"
>
  <header>
    <table
      style="width: 100%;border-bottom: 4px solid {{primaryColor}};font-family: sans-serif;"
    >
      <tr>
        <td style="width: 50%; text-align: left;">
          <img
            src="{{logo}}"
            alt="{{organizationName}}"
            style="height: auto; width: 180px; padding: 0px 20px;"
          />
        </td>
        <td
          style="
            width: 50%;
            text-align: right;
            vertical-align: middle;
            padding: 0px 20px;
          "
        >
          <span
            style="font-size: 20px; font-weight: 300; color: {{primaryColor}}"
            >{{organizationName}}</span
          >
        </td>
      </tr>
    </table>
  </header>
</div>`,
      }),
      new OrganizationCustomizationDocumentHeaderTemplateEntity({
        id: new OrganizationCustomizationDocumentHeaderTemplateId(
          '7c6d980a-c548-4c8f-952c-15f7db49eb39',
        ),
        type: OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN_STANDOUT,
        htmlContent: `<div
  style="width:100%; box-sizing:border-box; font-size:10px; line-height:1.2; background-color: {{primaryColor}}; -webkit-print-color-adjust: exact;"
>
  <header>
    <table style="width: 100%; font-family: sans-serif">
      <tr>
        <td
          style="text-align: center;"
        >
          <p align="center">
            <img
              src="{{logo}}"
              alt="{{organizationName}}"
              style="height: auto; width: 130px;"
            />
          </p>
          <div
            style="font-size: 20px;font-weight: 300;color: {{secondaryColor}}; margin: 0;"
          >
            {{organizationName}}
          </div>
        </td>
      </tr>
    </table>
  </header>
</div>`,
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

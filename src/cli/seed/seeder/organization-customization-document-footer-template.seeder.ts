import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/command/organization-customization-document-footer-template.command.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import { OrganizationCustomizationDocumentFooterTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/organization-customization-document-footer-template.entity';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const ORGANIZATION_CUSTOMIZATION_DOCUMENT_FOOTER_TEMPLATE_SEED_DATA: OrganizationCustomizationDocumentFooterTemplateEntity[] =
  [
    new OrganizationCustomizationDocumentFooterTemplateEntity({
      id: new OrganizationCustomizationDocumentFooterTemplateId(
        '7bc43cdc-f2ee-4978-a03a-31e607e51fd6',
      ),
      type: OrganizationCustomizationDocumentFooterTemplateTypeEnum.MODERN,
      htmlContent: `<footer style="display:flex;align-items:center;justify-content:space-between;padding:12px 32px;border-top:3px solid {{primaryColor}}">
  <img src="{{logo}}" alt="Logo" style="height:32px;object-fit:contain" />
  <span style="font-size:13px;font-weight:600;color:{{primaryColor}}">{{organizationName}}</span>
  <span style="font-size:12px;color:{{secondaryColor}}">{{footerDescription}}</span>
</footer>`,
    }),
    new OrganizationCustomizationDocumentFooterTemplateEntity({
      id: new OrganizationCustomizationDocumentFooterTemplateId(
        '703c6208-9fc0-4cae-a6c5-438bfe79289b',
      ),
      type: OrganizationCustomizationDocumentFooterTemplateTypeEnum.CLASSIC,
      htmlContent: `<footer style="display:flex;flex-direction:column;align-items:center;padding:12px 32px;border-top:1px solid {{secondaryColor}}">
  <hr style="width:100%;border:none;border-top:1px solid {{tertiaryColor}};margin-bottom:8px" />
  <img src="{{logo}}" alt="Logo" style="height:28px;object-fit:contain;margin-bottom:4px" />
  <p style="font-size:12px;color:{{primaryColor}};margin:0">{{organizationName}} | {{footerDescription}}</p>
</footer>`,
    }),
  ];

export class OrganizationCustomizationDocumentFooterTemplateSeeder implements SeederInterface {
  protected readonly _type =
    OrganizationCustomizationDocumentFooterTemplateSeeder.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway,
    )
    private readonly commandRepository: OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway,
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly queryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    for (const templateData of ORGANIZATION_CUSTOMIZATION_DOCUMENT_FOOTER_TEMPLATE_SEED_DATA) {
      const existing =
        await this.queryRepository.findOneOrganizationCustomizationDocumentFooterTemplateById(
          templateData.id,
        );

      if (existing) {
        continue;
      }

      transactions.push(
        this.commandRepository.createOrganizationCustomizationDocumentFooterTemplate(
          templateData,
        ),
      );
    }

    return transactions;
  }
}

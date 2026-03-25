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
        'b2c3d4e5-f6a7-4b8c-9d0e-000000000001',
      ),
      type: OrganizationCustomizationDocumentFooterTemplateTypeEnum.MODERN,
      htmlContent:
        '<footer class="footer-modern"><p>{{organizationName}} - {{footerDescription}}</p></footer>',
    }),
    new OrganizationCustomizationDocumentFooterTemplateEntity({
      id: new OrganizationCustomizationDocumentFooterTemplateId(
        'b2c3d4e5-f6a7-4b8c-9d0e-000000000002',
      ),
      type: OrganizationCustomizationDocumentFooterTemplateTypeEnum.CLASSIC,
      htmlContent:
        '<footer class="footer-classic"><hr/><p>{{organizationName}} | {{footerDescription}}</p></footer>',
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

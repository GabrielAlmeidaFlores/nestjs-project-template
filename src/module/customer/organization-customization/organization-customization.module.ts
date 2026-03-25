import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { OrganizationCustomizationController } from '@module/customer/organization-customization/organization-customization.controller';
import { CreateOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/create-organization-customization.use-case';
import { ListOrganizationCustomizationDocumentFooterTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-footer-templates.use-case';
import { ListOrganizationCustomizationDocumentHeaderTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-header-templates.use-case';
import { ListOrganizationCustomizationsUseCase } from '@module/customer/organization-customization/use-case/list-organization-customizations.use-case';
import { PatchOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/patch-organization-customization.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, OrganizationSessionModule],
  controllers: [OrganizationCustomizationController],
  providers: [
    CreateOrganizationCustomizationUseCase,
    PatchOrganizationCustomizationUseCase,
    ListOrganizationCustomizationsUseCase,
    ListOrganizationCustomizationDocumentHeaderTemplatesUseCase,
    ListOrganizationCustomizationDocumentFooterTemplatesUseCase,
  ],
})
export class OrganizationCustomizationModule {
  protected readonly _type = OrganizationCustomizationModule.name;
}

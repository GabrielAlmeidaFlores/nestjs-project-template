import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { FileProcessorModule } from '@module/customer/account/lib/file-processor/file-processor.module';
import { OrganizationCustomizationController } from '@module/customer/organization-customization/organization-customization.controller';
import { CreateOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/create-organization-customization.use-case';
import { GetOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/get-organization-customization.use-case';
import { ListOrganizationCustomizationDocumentFooterTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-footer-templates.use-case';
import { ListOrganizationCustomizationDocumentHeaderTemplatesUseCase } from '@module/customer/organization-customization/use-case/list-organization-customization-document-header-templates.use-case';
import { PatchOrganizationCustomizationUseCase } from '@module/customer/organization-customization/use-case/patch-organization-customization.use-case';
import { PreviewOrganizationCustomizationDocumentFooterTemplateUseCase } from '@module/customer/organization-customization/use-case/preview-organization-customization-document-footer-template.use-case';
import { PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase } from '@module/customer/organization-customization/use-case/preview-organization-customization-document-header-template.use-case';
import { UploadOrganizationCustomizationLogoUseCase } from '@module/customer/organization-customization/use-case/upload-organization-customization-logo.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    FileProcessorModule,
    OrganizationSessionModule,
  ],
  controllers: [OrganizationCustomizationController],
  providers: [
    CreateOrganizationCustomizationUseCase,
    GetOrganizationCustomizationUseCase,
    PatchOrganizationCustomizationUseCase,
    UploadOrganizationCustomizationLogoUseCase,
    ListOrganizationCustomizationDocumentHeaderTemplatesUseCase,
    ListOrganizationCustomizationDocumentFooterTemplatesUseCase,
    PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase,
    PreviewOrganizationCustomizationDocumentFooterTemplateUseCase,
  ],
})
export class OrganizationCustomizationModule {
  protected readonly _type = OrganizationCustomizationModule.name;
}

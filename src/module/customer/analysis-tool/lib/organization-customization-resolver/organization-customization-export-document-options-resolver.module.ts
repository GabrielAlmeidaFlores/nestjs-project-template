import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { FileProcessorModule } from '@module/customer/analysis-tool/lib/file-processor/file-processor.module';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';

@Module({
  imports: [DatabaseModule, FileProcessorModule],
  providers: [OrganizationCustomizationExportDocumentOptionsResolver],
  exports: [OrganizationCustomizationExportDocumentOptionsResolver],
})
export class OrganizationCustomizationExportDocumentOptionsResolverModule {
  protected readonly _type =
    OrganizationCustomizationExportDocumentOptionsResolverModule.name;
}

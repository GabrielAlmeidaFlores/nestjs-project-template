import { Module } from '@nestjs/common';

import { AdministrativeRequestGeneratorModule } from '@module/customer/documents-to-be-generated/module/administrative-request/administrative-request-generator.module';
import { ClientDocumentsModule } from '@module/customer/documents-to-be-generated/module/client-documents/client-documents.module';
import { FullOpinionGeneratorModule } from '@module/customer/documents-to-be-generated/module/full-opinion/full-opinion-generator.module';
import { InitialPetitionGeneratorModule } from '@module/customer/documents-to-be-generated/module/initial-petition/initial-petition-generator.module';

@Module({
  imports: [
    InitialPetitionGeneratorModule,
    AdministrativeRequestGeneratorModule,
    FullOpinionGeneratorModule,
    ClientDocumentsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DocumentsToBeGeneratedModule {
  protected readonly _type = DocumentsToBeGeneratedModule.name;
}

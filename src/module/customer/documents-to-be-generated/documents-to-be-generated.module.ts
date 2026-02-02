import { Module } from "@nestjs/common";

import { InitialPetitionGeneratorModule } from "@module/customer/documents-to-be-generated/module/initial-petition/initial-petition-generator.module";
import { AdministrativeRequestGeneratorModule } from "@module/customer/documents-to-be-generated/module/administrative-request/administrative-request-generator.module";
import { FullOpinionGeneratorModule } from "@module/customer/documents-to-be-generated/module/full-opinion/full-opinion-generator.module";

@Module({
  imports: [InitialPetitionGeneratorModule, AdministrativeRequestGeneratorModule, FullOpinionGeneratorModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DocumentsToBeGeneratedModule {
  protected readonly _type = DocumentsToBeGeneratedModule.name;
}
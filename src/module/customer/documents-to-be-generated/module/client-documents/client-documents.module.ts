import { Module } from '@nestjs/common';

import { ClientDocumentsController } from '@module/customer/documents-to-be-generated/module/client-documents/client-documents.controller';
import { FeeContractGeneratorModule } from '@module/customer/documents-to-be-generated/module/fee-contract/fee-contract-generator.module';
import { JefWaiverDeclarationGeneratorModule } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/jef-waiver-declaration-generator.module';
import { PovertyDeclarationGeneratorModule } from '@module/customer/documents-to-be-generated/module/poverty-declaration/poverty-declaration-generator.module';
import { PowerOfAttorneyGeneratorModule } from '@module/customer/documents-to-be-generated/module/power-of-attorney/power-of-attorney-generator.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    OrganizationSessionModule,
    FeeContractGeneratorModule,
    PowerOfAttorneyGeneratorModule,
    JefWaiverDeclarationGeneratorModule,
    PovertyDeclarationGeneratorModule,
  ],
  controllers: [ClientDocumentsController],
  providers: [],
  exports: [],
})
export class ClientDocumentsModule {
  protected readonly _type = ClientDocumentsModule.name;
}

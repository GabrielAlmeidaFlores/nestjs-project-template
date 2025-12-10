import { ClassProvider, Module } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AdminTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.command.repository';
import { AdminTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/admin/admin.typeorm.query.repository';
import { AnalysisToolClientTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.command.repository';
import { AnalysisToolClientTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client/analysis-tool-client.typeorm.query.repository';
import { AnalysisToolClientInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.typeorm.command.repository';
import { AnalysisToolRecordTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.command.repository';
import { AnalysisToolRecordTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CidTenTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.command.repository';
import { CidTenTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cid-ten/cid-ten.typeorm.query.repository';
import { CnisFastAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.command.repository';
import { CnisFastAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis/cnis-fast-analysis.typeorm.query.repository';
import { CnisFastAnalysisInssBenefitTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.typeorm.command.repository';
import { CnisFastAnalysisLegalProceedingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.typeorm.command.repository';
import { CnisFastAnalysisResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/cnis-fast-analysis-result/cnis-fast-analysis-result.typeorm.command.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-address/customer-address.typeorm.query.repository';
import { CustomerTermsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.command.repository';
import { CustomerTermsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms/customer-terms.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.command.repository';
import { CustomerTermsAcceptanceTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer-terms-acceptance/customer-terms-acceptance.typeorm.query.repository';
import { LegalPleadingTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.command.repository';
import { LegalPleadingTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading/legal-pleading.typeorm.query.repository';
import { LegalPleadingAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.command.repository';
import { LegalPleadingAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address/legal-pleading-address.typeorm.query.repository';
import { LegalPleadingResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.command.repository';
import { LegalPleadingResultTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-address-result/legal-pleading-result.typeorm.query.repository';
import { LegalPleadingDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.command.repository';
import { LegalPleadingDocumentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document/legal-pleading-document.typeorm.query.repository';
import { LegalPleadingDocumentAnalysisTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/legal-pleading-document-analysis/legal-pleading-document-analysis.typeorm.query.repository';
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization-member/organization-member.typeorm.query.repository';
import { RetirementPlanningRppsTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.command.repository';
import { RetirementPlanningRppsTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps/retirement-planning-rpps.typeorm.query.repository';
import { RetirementPlanningRppsPeriodTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period/retirement-planning-rpps-period.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDocumentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.typeorm.command.repository';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.typeorm.command.repository';
import { RetirementPlanningRppsResultTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/retirement-planning-rpps-result/retirement-planning-rpps-result.typeorm.command.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer/command/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/command/customer-address.command.repository.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-address/query/customer-address.query.repository.gateway';
import { CustomerTermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/command/customer-terms.command.repository.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization/command/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CidTenCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/command/cid-ten.command.repository.gateway';
import { CidTenQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/cid-ten.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingAddressCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/command/legal-pleading-address.repository.gateway';
import { LegalPleadingAddressQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/legal-pleading-address.query.repository.gateway';
import { LegalPleadingDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/command/legal-pleading-document.repository.gateway';
import { LegalPleadingDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/legal-pleading-document.query.repository.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { LegalPleadingDocumentAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/query/legal-pleading-document-analysis.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/legal-pleading-result.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';

const classProvider: ClassProvider[] = [
  {
    provide: BaseTransactionRepositoryGateway,
    useClass: BaseTypeormTransactionRepository,
  },
  {
    provide: AuthIdentityCommandRepositoryGateway,
    useClass: AuthIdentityTypeormCommandRepository,
  },
  {
    provide: AuthIdentityQueryRepositoryGateway,
    useClass: AuthIdentityTypeormQueryRepository,
  },
  {
    provide: CustomerCommandRepositoryGateway,
    useClass: CustomerTypeormCommandRepository,
  },
  {
    provide: CustomerQueryRepositoryGateway,
    useClass: CustomerTypeormQueryRepository,
  },
  {
    provide: CustomerAddressCommandRepositoryGateway,
    useClass: CustomerAddressTypeormCommandRepository,
  },
  {
    provide: CustomerAddressQueryRepositoryGateway,
    useClass: CustomerAddressTypeormQueryRepository,
  },
  {
    provide: OrganizationCommandRepositoryGateway,
    useClass: OrganizationTypeormCommandRepository,
  },
  {
    provide: OrganizationQueryRepositoryGateway,
    useClass: OrganizationTypeormQueryRepository,
  },
  {
    provide: OrganizationMemberCommandRepositoryGateway,
    useClass: OrganizationMemberTypeormCommandRepository,
  },
  {
    provide: OrganizationMemberQueryRepositoryGateway,
    useClass: OrganizationMemberTypeormQueryRepository,
  },
  {
    provide: CnisFastAnalysisCommandRepositoryGateway,
    useClass: CnisFastAnalysisTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientCommandRepositoryGateway,
    useClass: AnalysisToolClientTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisInssBenefitCommandRepositoryGateway,
    useClass: CnisFastAnalysisInssBenefitTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisLegalProceedingCommandRepositoryGateway,
    useClass: CnisFastAnalysisLegalProceedingTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisResultCommandRepositoryGateway,
    useClass: CnisFastAnalysisResultTypeormCommandRepository,
  },
  {
    provide: CnisFastAnalysisQueryRepositoryGateway,
    useClass: CnisFastAnalysisTypeormQueryRepository,
  },
  {
    provide: AnalysisToolClientQueryRepositoryGateway,
    useClass: AnalysisToolClientTypeormQueryRepository,
  },

  {
    provide: LegalPleadingCommandRepositoryGateway,
    useClass: LegalPleadingTypeormCommandRepository,
  },
  {
    provide: LegalPleadingQueryRepositoryGateway,
    useClass: LegalPleadingTypeormQueryRepository,
  },
  {
    provide: LegalPleadingAddressCommandRepositoryGateway,
    useClass: LegalPleadingAddressTypeormCommandRepository,
  },
  {
    provide: LegalPleadingAddressQueryRepositoryGateway,
    useClass: LegalPleadingAddressTypeormQueryRepository,
  },
  {
    provide: LegalPleadingDocumentCommandRepositoryGateway,
    useClass: LegalPleadingDocumentTypeormCommandRepository,
  },
  {
    provide: LegalPleadingDocumentQueryRepositoryGateway,
    useClass: LegalPleadingDocumentTypeormQueryRepository,
  },

  {
    provide: LegalPleadingDocumentAnalysisCommandRepositoryGateway,
    useClass: LegalPleadingDocumentAnalysisTypeormCommandRepository,
  },
  {
    provide: LegalPleadingDocumentAnalysisQueryRepositoryGateway,
    useClass: LegalPleadingDocumentAnalysisTypeormQueryRepository,
  },
  {
    provide: LegalPleadingResultCommandRepositoryGateway,
    useClass: LegalPleadingResultTypeormCommandRepository,
  },
  {
    provide: LegalPleadingResultQueryRepositoryGateway,
    useClass: LegalPleadingResultTypeormQueryRepository,
  },
  {
    provide: AnalysisToolRecordCommandRepositoryGateway,
    useClass: AnalysisToolRecordTypeormCommandRepository,
  },
  {
    provide: AnalysisToolRecordQueryRepositoryGateway,
    useClass: AnalysisToolRecordTypeormQueryRepository,
  },
  {
    provide: CustomerTermsQueryRepositoryGateway,
    useClass: CustomerTermsTypeormQueryRepository,
  },
  {
    provide: CustomerTermsCommandRepositoryGateway,
    useClass: CustomerTermsTypeormCommandRepository,
  },
  {
    provide: CustomerTermsAcceptanceQueryRepositoryGateway,
    useClass: CustomerTermsAcceptanceTypeormQueryRepository,
  },
  {
    provide: CustomerTermsAcceptanceCommandRepositoryGateway,
    useClass: CustomerTermsAcceptanceTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    useClass: AnalysisToolClientInssBenefitTypeormCommandRepository,
  },
  {
    provide: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
    useClass: AnalysisToolClientLegalProceedingTypeormCommandRepository,
  },
  {
    provide: CidTenCommandRepositoryGateway,
    useClass: CidTenTypeormCommandRepository,
  },
  {
    provide: CidTenQueryRepositoryGateway,
    useClass: CidTenTypeormQueryRepository,
  },

  {
    provide: AdminCommandRepositoryGateway,
    useClass: AdminTypeormCommandRepository,
  },
  {
    provide: AdminQueryRepositoryGateway,
    useClass: AdminTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsCommandRepositoryGateway,
    useClass: RetirementPlanningRppsTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsQueryRepositoryGateway,
    useClass: RetirementPlanningRppsTypeormQueryRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodDocumentTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway,
    useClass: RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsRemunerationCommandRepositoryGateway,
    useClass: RetirementPlanningRppsRemunerationTypeormCommandRepository,
  },
  {
    provide: RetirementPlanningRppsResultCommandRepositoryGateway,
    useClass: RetirementPlanningRppsResultTypeormCommandRepository,
  },
];

@Module({
  imports: [MapperModule, TypeormModule],
  providers: classProvider.flatMap((p) => [p, p.useClass]),
  exports: classProvider.map((p) => p.provide),
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}

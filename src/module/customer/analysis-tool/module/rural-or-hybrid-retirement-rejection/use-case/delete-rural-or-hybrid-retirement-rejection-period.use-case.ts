import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period/command/rural-or-hybrid-retirement-rejection-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-document/command/rural-or-hybrid-retirement-rejection-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member/command/rural-or-hybrid-retirement-rejection-period-member.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member-document/command/rural-or-hybrid-retirement-rejection-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-period.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionPeriodUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionPeriodCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionPeriodId: RuralOrHybridRetirementRejectionPeriodId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingPeriod = (
      existingRejection.ruralOrHybridRetirementRejectionPeriod ?? []
    ).find(
      (period) =>
        period.id.toString() ===
        ruralOrHybridRetirementRejectionPeriodId.toString(),
    );

    if (!existingPeriod) {
      throw new RuralOrHybridRetirementRejectionPeriodNotFoundError();
    }

    const periodDocuments = (
      existingRejection.ruralOrHybridRetirementRejectionPeriodDocument ?? []
    ).filter(
      (document) =>
        document.ruralOrHybridRetirementRejectionPeriodId.toString() ===
        ruralOrHybridRetirementRejectionPeriodId.toString(),
    );

    const periodMembers = (
      existingRejection.ruralOrHybridRetirementRejectionPeriodMember ?? []
    ).filter(
      (member) =>
        member.ruralOrHybridRetirementRejectionPeriodId.toString() ===
        ruralOrHybridRetirementRejectionPeriodId.toString(),
    );

    const transactions = [];

    for (const periodMember of periodMembers) {
      const periodMemberDocuments = (
        existingRejection.ruralOrHybridRetirementRejectionPeriodMemberDocument ??
        []
      ).filter(
        (document) =>
          document.ruralOrHybridRetirementRejectionPeriodMemberId.toString() ===
          periodMember.id.toString(),
      );

      for (const periodMemberDocument of periodMemberDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMemberDocument(
            periodMemberDocument.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMember(
          periodMember.id,
        ),
      );
    }

    for (const periodDocument of periodDocuments) {
      transactions.push(
        this.ruralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodDocument(
          periodDocument.id,
        ),
      );
    }

    transactions.push(
      this.ruralOrHybridRetirementRejectionPeriodCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionPeriod(
        ruralOrHybridRetirementRejectionPeriodId,
        new RuralOrHybridRetirementRejectionPeriodEntity({
          id: ruralOrHybridRetirementRejectionPeriodId,
          startDate: existingPeriod.startDate,
          endDate: existingPeriod.endDate,
          workerType: existingPeriod.workerType,
          workSchedule: existingPeriod.workSchedule,
          propertyName: existingPeriod.propertyName,
          propertyCategory: existingPeriod.propertyCategory,
          propertyOwner: existingPeriod.propertyOwner,
          propertyCep: existingPeriod.propertyCep,
          propertyState: existingPeriod.propertyState,
          propertyCity: existingPeriod.propertyCity,
          propertyNeighbourhood: existingPeriod.propertyNeighbourhood,
          propertyStreet: existingPeriod.propertyStreet,
          propertyNumber: existingPeriod.propertyNumber,
          productionDestination: existingPeriod.productionDestination,
          employee: existingPeriod.employee,
          employeeAmount: existingPeriod.employeeAmount,
          agriculturalMachinery: existingPeriod.agriculturalMachinery,
          agriculturalMachineryDescription:
            existingPeriod.agriculturalMachineryDescription,
          farmVehicles: existingPeriod.farmVehicles,
          farmVehiclesDescription: existingPeriod.farmVehiclesDescription,
          incomeBesidesRuralProduction:
            existingPeriod.incomeBesidesRuralProduction,
          incomeBesidesRuralProductionDescription:
            existingPeriod.incomeBesidesRuralProductionDescription,
          clientHasOrHadCnpj: existingPeriod.clientHasOrHadCnpj,
          clientHasOrHadCnpjDescription:
            existingPeriod.clientHasOrHadCnpjDescription,
          clientLivesInUrbanArea: existingPeriod.clientLivesInUrbanArea,
          clientMunicipality: existingPeriod.clientMunicipality,
          clientState: existingPeriod.clientState,
          distance: existingPeriod.distance,
          ruralOrHybridRetirementRejectionId,
          deletedAt: new Date(),
        }),
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionPeriodResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}

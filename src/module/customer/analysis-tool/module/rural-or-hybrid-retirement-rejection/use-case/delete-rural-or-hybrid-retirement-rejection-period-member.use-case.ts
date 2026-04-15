import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member/command/rural-or-hybrid-retirement-rejection-period-member.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member-document/command/rural-or-hybrid-retirement-rejection-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionPeriodMemberResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-period-member.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionPeriodMemberNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-period-member-not-found.error';
import { RuralOrHybridRetirementRejectionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionPeriodMemberUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionPeriodMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
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
    ruralOrHybridRetirementRejectionPeriodMemberId: RuralOrHybridRetirementRejectionPeriodMemberId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionPeriodMemberResponseDto> {
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

    const existingMember = (
      existingRejection.ruralOrHybridRetirementRejectionPeriodMember ?? []
    ).find(
      (member) =>
        member.id.toString() ===
          ruralOrHybridRetirementRejectionPeriodMemberId.toString() &&
        member.ruralOrHybridRetirementRejectionPeriodId.toString() ===
          ruralOrHybridRetirementRejectionPeriodId.toString(),
    );

    if (!existingMember) {
      throw new RuralOrHybridRetirementRejectionPeriodMemberNotFoundError();
    }

    const memberDocuments = (
      existingRejection.ruralOrHybridRetirementRejectionPeriodMemberDocument ??
      []
    ).filter(
      (document) =>
        document.ruralOrHybridRetirementRejectionPeriodMemberId.toString() ===
        ruralOrHybridRetirementRejectionPeriodMemberId.toString(),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...memberDocuments.map((document) =>
        this.ruralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMemberDocument(
          document.id,
        ),
      ),
      this.ruralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionPeriodMember(
        ruralOrHybridRetirementRejectionPeriodMemberId,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionPeriodMemberResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}

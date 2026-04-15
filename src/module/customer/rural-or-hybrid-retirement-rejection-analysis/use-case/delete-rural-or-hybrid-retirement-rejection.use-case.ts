import { Inject, Injectable } from '@nestjs/common';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { DeleteRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/gateway/base-transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/generic/organization-member/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/organization-session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = DeleteRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly queryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly commandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    rejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionResponseDto> {
    // 1. Validate organization member
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new Error('Organization member not found');
    }

    // 2. Load rejection
    const rejection = await this.queryRepositoryGateway.findOneByIdWithRelations(
      rejectionId,
    );

    if (rejection === null || rejection.organizationId !== organizationSessionData.organizationId) {
      throw new RuralOrHybridRetirementRejectionNotFoundError();
    }

    // 3. Create transaction
    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.commandRepositoryGateway.deleteRuralOrHybridRetirementRejection(
        rejectionId,
      ),
    ]);

    // 4. Commit transaction
    await transaction.commit();

    // 5. Return response
    return DeleteRuralOrHybridRetirementRejectionResponseDto.build({
      id: rejectionId,
    });
  }
}

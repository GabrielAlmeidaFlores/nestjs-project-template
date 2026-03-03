import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-history/command/legal-pleading-history.command.repository.gateway';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingHistoryTitleEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/enum/legal-pleading-history-title.enum';
import { LegalPleadingHistoryEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/legal-pleading-history.entity';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { UpdateLegalPleadingStatusToCompleteResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading-to-complete-status.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/module/legal-pleading/error/legal-pleading-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateLegalPleadingStatusToCompleteUseCase {
  protected readonly _type = UpdateLegalPleadingStatusToCompleteUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(LegalPleadingCommandRepositoryGateway)
    private readonly legalPleadingCommandRepositoryGateway: LegalPleadingCommandRepositoryGateway,
    @Inject(LegalPleadingHistoryCommandRepositoryGateway)
    private readonly legalPleadingHistoryCommandRepositoryGateway: LegalPleadingHistoryCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
  ): Promise<UpdateLegalPleadingStatusToCompleteResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalPleadingQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        LegalPleadingNotFoundError,
      );
    const analysisToolClient = new AnalysisToolClientEntity({
      ...legalPleadingQueryResult.analysisToolClient,
      createdBy: legalPleadingQueryResult.analysisToolClient.createdBy.id,
      updatedBy: legalPleadingQueryResult.analysisToolClient.updatedBy.id,
    });

    const legalPleadingAddress = legalPleadingQueryResult.legalPleadingAddress
      ? new LegalPleadingAddressEntity({
          ...legalPleadingQueryResult.legalPleadingAddress,
        })
      : null;

    const legalPleadingResult = legalPleadingQueryResult.legalPleadingResult
      ? new LegalPleadingResultEntity({
          ...legalPleadingQueryResult.legalPleadingResult,
        })
      : null;

    const legalPleadingUpdate = new LegalPleadingEntity({
      ...legalPleadingQueryResult,
      legalPleadingAddress,
      legalPleadingResult,
      analysisToolClient,
      status: AnalysisStatusEnum.COMPLETED,
      createdBy: legalPleadingQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const legalPleadingTransaction =
      this.legalPleadingCommandRepositoryGateway.updateLegalPleading(
        legalPleadingQueryResult.id,
        legalPleadingUpdate,
      );

    const legalPleadingHistory = new LegalPleadingHistoryEntity({
      title: LegalPleadingHistoryTitleEnum.APPROVED,
      description:
        'Você aprovou a versão final do documento. A peça está pronta para download e uso.',
      legalPleading: legalPleadingId,
    });

    const legalPleadingHistoryTransaction =
      this.legalPleadingHistoryCommandRepositoryGateway.createLegalPleadingHistory(
        legalPleadingHistory,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      legalPleadingTransaction,
      legalPleadingHistoryTransaction,
    ]);
    await transaction.commit();

    return UpdateLegalPleadingStatusToCompleteResponseDto.build({
      legalPleadingId: legalPleadingQueryResult.id,
    });
  }
}

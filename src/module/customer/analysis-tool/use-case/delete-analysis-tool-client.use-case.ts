import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteAnalysisToolClientUseCase {
  protected readonly _type = DeleteAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly analysisToolClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(LegalPleadingCommandRepositoryGateway)
    private readonly legalPleadingCommandRepositoryGateway: LegalPleadingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const transactions: TransactionType[] = [];

    const analysisToolRecords =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId(
        analysisToolClientResult.id,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    for (const record of analysisToolRecords) {
      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord(
          record.id,
          organizationMember.id,
        ),
      );
    }

    const legalPleadings =
      await this.legalPleadingQueryRepositoryGateway.findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId(
        analysisToolClientResult.id,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    for (const legalPleading of legalPleadings) {
      transactions.push(
        this.legalPleadingCommandRepositoryGateway.deleteLegalPleading(
          legalPleading.id,
          organizationMember.id,
        ),
      );
    }

    transactions.push(
      this.analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient(
        analysisToolClientResult.id,
        organizationMember.id,
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return DeleteAnalysisToolClientResponseDto.build({
      analysisToolClientId: analysisToolClientResult.id,
    });
  }
}

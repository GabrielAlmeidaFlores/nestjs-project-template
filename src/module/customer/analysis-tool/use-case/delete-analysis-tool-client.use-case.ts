import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';

import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisToolClientHasAnalysis } from '@module/customer/analysis-tool/error/analysis-tool-client-has-analysis-conflict.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { DeleteAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/delete-analysis-tool-client.request.dto';

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
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
    dto: DeleteAnalysisToolClientRequestDto,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const clientAnalysis =
      await this.analysisToolClientQueryRepositoryGateway.findOneWithAnalysisRelationsByAnalysisToolClientAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    // Se tem análises vinculadas e o usuário NÃO permitiu força total, lança erro
    if (
      clientAnalysis.cnisFastAnalysis?.length > 0 &&
      !dto.forceDeleteWithAnalysis
    ) {
      throw new AnalysisToolClientHasAnalysis();
    }

    // Cria entidade do cliente para update + delete
    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientResult,
      createdBy: analysisToolClientResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateTransaction =
      this.analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient(
        analysisToolClientResult.id,
        analysisToolClient,
      );

    const deleteTransaction =
      this.analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient(
        analysisToolClientResult.id,
      );

    const transactionArray = [updateTransaction, deleteTransaction];

    // ADIÇÃO: se for forçado, deleta (soft delete) todos os CNIS vinculados
    if (
      dto.forceDeleteWithAnalysis &&
      clientAnalysis.cnisFastAnalysis?.length
    ) {
      const deleteCnisFastAnalysisTxs = clientAnalysis.cnisFastAnalysis.map(
        (cnis) => {
          const updatedCnis = new CnisFastAnalysisEntity({
            ...cnis,
            deletedAt: new Date(),
            updatedBy: organizationMember.id,
          });

          return this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
            cnis.id,
            updatedCnis,
          );
        },
      );

      transactionArray.push(...deleteCnisFastAnalysisTxs);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactionArray);
    await transaction.commit();

    return DeleteAnalysisToolClientResponseDto.build({
      analysisToolClientId: analysisToolClientResult.id,
    });
  }
}

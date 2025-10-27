import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { DeleteCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/delete-cnis-fast-analysis.response';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteCnisFastAnalysisUseCase {
  protected readonly _type = DeleteCnisFastAnalysisUseCase.name;

  public constructor(
    private readonly deleteLegalPleadingUseCase: DeleteLegalPleadingUseCase,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<DeleteCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisAndOrganizationIdOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    const legalPleadingResult =
      await this.legalPleadingQueryRepositoryGateway.findByAnalysisToolClientAndOrganizationId(
        cnisFastAnalysisResult.analysisToolClient.id,
        organizationSessionData.organizationId,
      );

    const deleteLegalPleading = legalPleadingResult.map(
      async (legalPleading) =>
        await this.deleteLegalPleadingUseCase.execute(
          sessionData,
          organizationSessionData,
          legalPleading.id,
        ),
    );

    await Promise.all(deleteLegalPleading);

    const deleteTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis(
        cnisFastAnalysisResult.id,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId: cnisFastAnalysisResult.id,
    });
  }
}

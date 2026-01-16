import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { DeleteAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/delete-administrative-procedure-inss-analysis.response';
import { AdministrativeProcedureInssAnalysisNotFoundError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteAdministrativeProcedureInssAnalysisUseCase {
  protected readonly _type =
    DeleteAdministrativeProcedureInssAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisQueryRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisQueryRepositoryGateway: AdministrativeProcedureInssAnalysisQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisCommandRepositoryGateway: AdministrativeProcedureInssAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<DeleteAdministrativeProcedureInssAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const administrativeProcedureInssAnalysisResult =
      await this.administrativeProcedureInssAnalysisQueryRepositoryGateway.findOneByAdministrativeProcedureInssAnalysisIdAndOrganizationIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    const deleteTransaction =
      this.administrativeProcedureInssAnalysisCommandRepositoryGateway.deleteAdministrativeProcedureInssAnalysis(
        administrativeProcedureInssAnalysisResult.id,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteAdministrativeProcedureInssAnalysisResponseDto.build({
      administrativeProcedureInssAnalysisId:
        administrativeProcedureInssAnalysisResult.id,
    });
  }
}

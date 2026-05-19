import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/command/survivor-pension-analysis-result-dependent-pension-analysis.command.repository.gateway';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';
import { DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase {
  protected readonly _type =
    DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway: SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisResultDependentPensionAnalysisId: SurvivorPensionAnalysisResultDependentPensionAnalysisId,
  ): Promise<DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway.deleteSurvivorPensionAnalysisResultDependentPensionAnalysis(
        survivorPensionAnalysisResultDependentPensionAnalysisId,
      ),
    ]);

    await txn.commit();

    return DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.build(
      {
        survivorPensionAnalysisResultDependentPensionAnalysisId,
      },
    );
  }
}

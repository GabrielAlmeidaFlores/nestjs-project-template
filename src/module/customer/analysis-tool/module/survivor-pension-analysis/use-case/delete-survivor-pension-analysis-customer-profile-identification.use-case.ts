import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/command/survivor-pension-analysis-customer-profile-identification.command.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/survivor-pension-analysis-customer-profile-identification.query.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-customer-profile-identification.response.dto';
import { SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-customer-profile-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase {
  protected readonly _type =
    DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cpiQueryResult =
      await this.survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisCustomerProfileIdentificationId,
        SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      cpiQueryResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway.deleteSurvivorPensionAnalysisCustomerProfileIdentification(
        survivorPensionAnalysisCustomerProfileIdentificationId,
      ),
    ]);

    await txn.commit();

    return DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto.build(
      { survivorPensionAnalysisCustomerProfileIdentificationId },
    );
  }
}

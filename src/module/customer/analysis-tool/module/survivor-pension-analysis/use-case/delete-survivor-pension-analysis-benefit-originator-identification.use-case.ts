import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/command/survivor-pension-analysis-benefit-originator-identification.command.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/survivor-pension-analysis-benefit-originator-identification.query.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-benefit-originator-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase {
  protected readonly _type =
    DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const boiQueryResult =
      await this.survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisBenefitOriginatorIdentificationId,
        SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      boiQueryResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway.deleteSurvivorPensionAnalysisBenefitOriginatorIdentification(
        survivorPensionAnalysisBenefitOriginatorIdentificationId,
      ),
    ]);

    await txn.commit();

    return DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto.build(
      { survivorPensionAnalysisBenefitOriginatorIdentificationId },
    );
  }
}

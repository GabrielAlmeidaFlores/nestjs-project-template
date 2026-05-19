import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/command/survivor-pension-analysis-deceased-benefit-dependents.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/survivor-pension-analysis-deceased-benefit-dependents.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-benefit-dependents.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-benefit-dependents-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase {
  protected readonly _type =
    UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    dto: UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dbdResult =
      await this.survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDeceasedBenefitDependentsId,
        SurvivorPensionAnalysisDeceasedBenefitDependentsNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dbdResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const updatedEntity =
      new SurvivorPensionAnalysisDeceasedBenefitDependentsEntity({
        id: survivorPensionAnalysisDeceasedBenefitDependentsId,
        survivorPensionAnalysisId: dbdResult.survivorPensionAnalysisId,
        dependentFullName: dto.dependentFullName ?? dbdResult.dependentFullName,
        dependencyClassificationLevel:
          dto.dependencyClassificationLevel ??
          dbdResult.dependencyClassificationLevel,
        type: dto.type ?? dbdResult.type,
        gender: dto.gender ?? dbdResult.gender,
        dateOfBirth: dto.dateOfBirth ?? dbdResult.dateOfBirth,
        hasDisabilityOrInvalidity:
          dto.hasDisabilityOrInvalidity ?? dbdResult.hasDisabilityOrInvalidity,
        unionCommencementDate:
          dto.unionCommencementDate ?? dbdResult.unionCommencementDate,
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway.updateSurvivorPensionAnalysisDeceasedBenefitDependents(
        survivorPensionAnalysisDeceasedBenefitDependentsId,
        updatedEntity,
      ),
    ]);

    await txn.commit();

    return UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.build(
      { survivorPensionAnalysisDeceasedBenefitDependentsId },
    );
  }
}

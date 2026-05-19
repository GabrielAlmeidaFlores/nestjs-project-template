import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/command/survivor-pension-analysis-deceased-benefit-dependents.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-deceased-benefit-dependents.request.dto';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase {
  protected readonly _type =
    CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
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
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: CreateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const entity = new SurvivorPensionAnalysisDeceasedBenefitDependentsEntity({
      survivorPensionAnalysisId,
      ...(dto.dependentFullName !== undefined && {
        dependentFullName: dto.dependentFullName,
      }),
      ...(dto.dependencyClassificationLevel !== undefined && {
        dependencyClassificationLevel: dto.dependencyClassificationLevel,
      }),
      ...(dto.type !== undefined && { type: dto.type }),
      ...(dto.gender !== undefined && { gender: dto.gender }),
      ...(dto.dateOfBirth !== undefined && { dateOfBirth: dto.dateOfBirth }),
      ...(dto.hasDisabilityOrInvalidity !== undefined && {
        hasDisabilityOrInvalidity: dto.hasDisabilityOrInvalidity,
      }),
      ...(dto.unionCommencementDate !== undefined && {
        unionCommencementDate: dto.unionCommencementDate,
      }),
    });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedBenefitDependents(
        entity,
      ),
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.build(
      { survivorPensionAnalysisDeceasedBenefitDependentsId: entity.id },
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/command/survivor-pension-analysis-result-dependent-pension-analysis.command.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-result-dependent-pension-analysis.request.dto';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase {
  protected readonly _type =
    CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
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
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
    dto: CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const resultResult =
      await this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisResultId,
        SurvivorPensionAnalysisResultNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      resultResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const entity =
      new SurvivorPensionAnalysisResultDependentPensionAnalysisEntity({
        survivorPensionAnalysisResultId,
        ...(dto.dependentName !== undefined && {
          dependentName: dto.dependentName,
        }),
        ...(dto.dependencyDegree !== undefined && {
          dependencyDegree: dto.dependencyDegree,
        }),
        ...(dto.isDependencyVerified !== undefined && {
          isDependencyVerified: dto.isDependencyVerified,
        }),
        ...(dto.pensionStartDate !== undefined && {
          pensionStartDate: dto.pensionStartDate,
        }),
        ...(dto.estimatedPensionDuration !== undefined && {
          estimatedPensionDuration: dto.estimatedPensionDuration,
        }),
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway.createSurvivorPensionAnalysisResultDependentPensionAnalysis(
        entity,
      ),
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.build(
      {
        survivorPensionAnalysisResultDependentPensionAnalysisId: entity.id,
      },
    );
  }
}

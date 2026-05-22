import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/command/survivor-pension-analysis-deceased-work-history.command.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-deceased-work-history.request.dto';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-deceased-work-history.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase {
  protected readonly _type =
    CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    dto: CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
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

    const dwhEntity = new SurvivorPensionAnalysisDeceasedWorkHistoryEntity({
      survivorPensionAnalysisId,
      ...(dto.startDate !== undefined && {
        startDate: dto.startDate,
      }),
      ...(dto.endDate !== undefined && {
        endDate: dto.endDate,
      }),
      remunerations: dto.remunerations ?? [],
    });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedWorkHistory(
        dwhEntity,
      ),
    ]);

    await txn.commit();

    return CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto.build({
      survivorPensionAnalysisDeceasedWorkHistoryId: dwhEntity.id,
    });
  }
}

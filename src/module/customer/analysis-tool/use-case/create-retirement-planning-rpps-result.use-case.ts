import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/command/retirement-planning-rpps-result.command.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { CreateRetirementPlanningRppsResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-result.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRppsResultUseCase {
  protected readonly _type = CreateRetirementPlanningRppsResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsResultCommandRepositoryGateway)
    private readonly retirementPlanningRppsResultCommandRepositoryGateway: RetirementPlanningRppsResultCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<CreateRetirementPlanningRppsResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRppsQueryResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const analysisData = {
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      ctcDocuments: retirementPlanningRppsQueryResult.ctcDocuments,
      periods: retirementPlanningRppsQueryResult.periods,
      remunerations: retirementPlanningRppsQueryResult.remunerations,
    };

    const documentsBuffer: Buffer[] = [
      Buffer.from(JSON.stringify(analysisData, null, 2), 'utf-8'),
    ];

    const retirementPlanningRppsCompleteAnalysis =
      await this.analysisProcessorGateway.getRetirementPlanningRppsCompleteAnalysis(
        documentsBuffer,
      );

    if (!retirementPlanningRppsCompleteAnalysis) {
      throw new Error('Failed to generate retirement planning analysis');
    }

    const retirementPlanningRppsResult = new RetirementPlanningRppsResultEntity(
      {
        retirementPlanningRppsCompleteAnalysis,
        retirementPlanningRppsSimplifiedAnalysis: null,
      },
    );

    const retirementPlanningRpps = new RetirementPlanningRppsEntity({
      id: retirementPlanningRppsQueryResult.id,
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      retirementPlanningRppsResult,
    });

    const retirementPlanningRppsTransaction =
      this.retirementPlanningRppsCommandRepositoryGateway.updateRetirementPlanningRpps(
        retirementPlanningRpps.id,
        retirementPlanningRpps,
      );

    const retirementPlanningRppsResultTransaction =
      this.retirementPlanningRppsResultCommandRepositoryGateway.createRetirementPlanningRppsResult(
        retirementPlanningRppsResult,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRppsResultTransaction,
      retirementPlanningRppsTransaction,
    ]);

    await transaction.commit();

    return CreateRetirementPlanningRppsResultResponseDto.build({
      retirementPlanningRppsCompleteAnalysis,
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';
import {
  CreateTeacherRetirementPlanningResultResponseDto,
  TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto,
  TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto,
  TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-result.response.dto';
import { FailedToGenerateTeacherRetirementPlanningRppsAnalysisError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/failed-to-generate-teacher-retirement-planning-analysis.error';
import { TeacherRetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-not-found.error';
import { TeacherRetirementPlanningRppsCompleteAnalysisDataInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/model/generic/teacher-retirement-planning-complete-analysis-data.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTeacherRetirementPlanningResultRppsUseCase {
  protected readonly _type =
    CreateTeacherRetirementPlanningResultRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsCommandRepositoryGateway)
    private readonly teacherRetirementPlanningCommandRepositoryGateway: TeacherRetirementPlanningRppsCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningResultCommandRepositoryGateway: TeacherRetirementPlanningRppsResultCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<CreateTeacherRetirementPlanningResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const planning =
      await this.teacherRetirementPlanningQueryRepositoryGateway.findOneTeacherRetirementPlanningByIdWithRelations(
        teacherRetirementPlanningId,
      );

    if (planning === null) {
      throw new TeacherRetirementPlanningRppsNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
        new TeacherRetirementPlanningId(teacherRetirementPlanningId.toString()),
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TeacherRetirementPlanningRppsNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const input = {
      federativeEntity: planning.federativeEntity,
      state: planning.state,
      municipality: planning.municipality,
      analysisName: planning.analysisName,
      currentPosition: planning.currentPosition,
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
      inssBenefits: planning.inssBenefits,
      legalProceedings: planning.legalProceedings,
      periods: planning.periods,
      remunerations: planning.remunerations,
    };

    const completeAnalysis =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningCompleteAnalysis(
        promptResponse.prompt,
        [Buffer.from(JSON.stringify(input, null, 2), 'utf-8')],
      );

    if (completeAnalysis === null) {
      throw new FailedToGenerateTeacherRetirementPlanningRppsAnalysisError();
    }

    let parsedAnalysis: TeacherRetirementPlanningRppsCompleteAnalysisDataInterface;
    try {
      parsedAnalysis = JSON.parse(
        completeAnalysis,
      ) as TeacherRetirementPlanningRppsCompleteAnalysisDataInterface;
    } catch {
      throw new FailedToGenerateTeacherRetirementPlanningRppsAnalysisError();
    }

    const resultEntity = new TeacherRetirementPlanningRppsResultEntity({
      ...(planning.result !== null && { id: planning.result.id }),
      teacherRetirementPlanningCompleteAnalysis: completeAnalysis,
      teacherRetirementPlanningSimplifiedAnalysis: null,
      teacherRetirementPlanningCompleteAnalysisDownload: null,
    });

    const planningEntity = new TeacherRetirementPlanningRppsEntity({
      id: planning.id,
      federativeEntity: planning.federativeEntity,
      state: planning.state,
      municipality: planning.municipality,
      analysisName: planning.analysisName,
      currentPosition: planning.currentPosition,
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
      teacherRetirementPlanningResult: resultEntity,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const teacherRetirementPlanning =
      this.buildTeacherRetirementPlanningEntity(planningEntity);

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      teacherRetirementPlanning,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactions = [
      planning.result === null
        ? this.teacherRetirementPlanningResultCommandRepositoryGateway.createTeacherRetirementPlanningResult(
            resultEntity,
          )
        : this.teacherRetirementPlanningResultCommandRepositoryGateway.updateTeacherRetirementPlanningResult(
            resultEntity,
          ),
      this.teacherRetirementPlanningCommandRepositoryGateway.updateTeacherRetirementPlanning(
        planningEntity.id,
        planningEntity,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    ];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      ...transactions,
    ]);

    await transaction.commit();

    const completeAnalysisDto =
      TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto.build({
        timeline: parsedAnalysis.timeline.map((item) =>
          TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto.build(
            {
              startDate: item.startDate,
              endDate: item.endDate,
              activityType: item.activityType,
              type: item.type,
              location: item.location,
            },
          ),
        ),
        retirementRules: parsedAnalysis.retirementRules.map((rule) =>
          TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto.build(
            {
              ruleName: rule.ruleName,
              ...(rule.result !== undefined && { result: rule.result }),
              ...(rule.rightDate !== undefined && {
                rightDate: rule.rightDate,
              }),
              ...(rule.estimatedRMI !== undefined && {
                estimatedRMI: rule.estimatedRMI,
              }),
              bestRMI: rule.bestRMI,
              highestLawsuitValue: rule.highestLawsuitValue,
              detailedRuleAnalysis: rule.detailedRuleAnalysis,
            },
          ),
        ),
        finalAnalysis: parsedAnalysis.finalAnalysis,
        teacherTime: parsedAnalysis.teacherTime,
        commonTime: parsedAnalysis.commonTime,
        totalContributionTime: parsedAnalysis.totalContributionTime,
        publicServiceTime: parsedAnalysis.publicServiceTime,
        positionTenureTime: parsedAnalysis.positionTenureTime,
      });

    return CreateTeacherRetirementPlanningResultResponseDto.build({
      teacherRetirementPlanningCompleteAnalysis: completeAnalysisDto,
    });
  }

  private buildTeacherRetirementPlanningEntity(
    planningEntity: TeacherRetirementPlanningRppsEntity,
  ): TeacherRetirementPlanningEntity {
    return new TeacherRetirementPlanningEntity({
      id: new TeacherRetirementPlanningId(planningEntity.id.toString()),
      federativeEntity:
        planningEntity.federativeEntity as TeacherRetirementPlanningFederativeEntityEnum,
      state: planningEntity.state,
      municipality: planningEntity.municipality,
      analysisName: planningEntity.analysisName,
      currentPosition: planningEntity.currentPosition,
      activityType:
        planningEntity.activityType as TeacherRetirementPlanningActivityTypeEnum,
      publicServiceStartDate: planningEntity.publicServiceStartDate,
      careerStartDate: planningEntity.careerStartDate,
      administrativeProcessAnalysis:
        planningEntity.administrativeProcessAnalysis,
      teacherRetirementPlanningResult: null,
    });
  }
}

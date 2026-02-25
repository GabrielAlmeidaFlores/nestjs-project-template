import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';
import { CreateTeacherRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-result.response.dto';
import { FailedToGenerateTeacherRetirementPlanningAnalysisError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/failed-to-generate-teacher-retirement-planning-analysis.error';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTeacherRetirementPlanningResultUseCase {
  protected readonly _type = CreateTeacherRetirementPlanningResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningCommandRepositoryGateway)
    private readonly teacherRetirementPlanningCommandRepositoryGateway: TeacherRetirementPlanningCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningResultCommandRepositoryGateway: TeacherRetirementPlanningResultCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
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
      throw new TeacherRetirementPlanningNotFoundError();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
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
      throw new FailedToGenerateTeacherRetirementPlanningAnalysisError();
    }

    let parsedAnalysis: object;
    try {
      parsedAnalysis = JSON.parse(completeAnalysis) as object;
    } catch {
      throw new FailedToGenerateTeacherRetirementPlanningAnalysisError();
    }

    const resultEntity = new TeacherRetirementPlanningResultEntity({
      ...(planning.result !== null && { id: planning.result.id }),
      teacherRetirementPlanningCompleteAnalysis: completeAnalysis,
      teacherRetirementPlanningSimplifiedAnalysis: null,
      teacherRetirementPlanningCompleteAnalysisDownload: null,
    });

    const planningEntity = new TeacherRetirementPlanningEntity({
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
    ];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      ...transactions,
    ]);

    await transaction.commit();

    return CreateTeacherRetirementPlanningResultResponseDto.build({
      teacherRetirementPlanningCompleteAnalysis: parsedAnalysis,
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration-calculation/command/retirement-planning-rpps-remuneration-calculation.command.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { UpdateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/update-retirement-planning-rpps-remuneration.request.dto';
import { UpdateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/update-retirement-planning-rpps-remuneration.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRetirementPlanningRppsRemunerationUseCase {
  protected readonly _type =
    UpdateRetirementPlanningRppsRemunerationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationQueryRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationQueryRepositoryGateway: RetirementPlanningRppsRemunerationQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationCommandRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationCommandRepositoryGateway: RetirementPlanningRppsRemunerationCommandRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
    @Inject(
      RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway,
    )
    private readonly retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway: RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    dto: UpdateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<UpdateRetirementPlanningRppsRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRpps =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRppsNotFoundError,
      );

    const currentRemunerations =
      await this.retirementPlanningRppsRemunerationQueryRepositoryGateway.findByRetirementPlanningRppsId(
        retirementPlanningRppsId,
      );

    const transactionOperations: TransactionType[] = [];

    for (const currentRemuneration of currentRemunerations) {
      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCommandRepositoryGateway.deleteRetirementPlanningRppsRemuneration(
          currentRemuneration.id,
        ),
      );
    }

    const retirementPlanningRppsEntity = new RetirementPlanningRppsEntity({
      id: retirementPlanningRpps.id,
      careerStartDate: retirementPlanningRpps.careerStartDate,
      publicServiceStartDate: retirementPlanningRpps.publicServiceStartDate,
    });

    for (const remunerationDto of dto.remunerations) {
      const normalizedDateToDayOne = new Date(
        remunerationDto.remunerationDate.getFullYear(),
        remunerationDto.remunerationDate.getMonth(),
        1,
      );

      const remunerationEntity = new RetirementPlanningRppsRemunerationEntity({
        id: new RetirementPlanningRppsRemunerationId(),
        remunerationDate: normalizedDateToDayOne,
        remunerationAmount: remunerationDto.remunerationAmount,
        retirementPlanningRpps: retirementPlanningRppsEntity,
      });

      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCommandRepositoryGateway.createRetirementPlanningRppsRemuneration(
          remunerationEntity,
        ),
      );
    }

    if (retirementPlanningRpps.retirementPlanningRppsRemunerationCalculation) {
      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway.deleteRetirementPlanningRppsRemunerationCalculation(
          retirementPlanningRpps.retirementPlanningRppsRemunerationCalculation
            .id,
        ),
      );
    }

    const retirementPlanningRppsRemunerationCalculation =
      this.remunerationCalculatorGateway.calculate(
        dto.remunerations.map((remunerationDto) =>
          RemunerationDataInputModel.build({
            remunerationDate: new Date(
              remunerationDto.remunerationDate.getFullYear(),
              remunerationDto.remunerationDate.getMonth(),
              1,
            ),
            remunerationAmount: remunerationDto.remunerationAmount,
          }),
        ),
      );

    const retirementPlanningRppsRemunerationCalculationEntity =
      new RetirementPlanningRppsRemunerationCalculationEntity({
        totalCompetencies:
          retirementPlanningRppsRemunerationCalculation.totalCompetencies,
        totalAmount: retirementPlanningRppsRemunerationCalculation.totalAmount,
        averageAmount:
          retirementPlanningRppsRemunerationCalculation.averageAmount,
        topEightyPercentCompetencies:
          retirementPlanningRppsRemunerationCalculation.topEightyPercentCompetencies,
        bottomTwentyPercentCompetencies:
          retirementPlanningRppsRemunerationCalculation.bottomTwentyPercentCompetencies,
        topEightyPercentAverageAmount:
          retirementPlanningRppsRemunerationCalculation.topEightyPercentAverageAmount,
      });

    transactionOperations.push(
      this.retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway.createRetirementPlanningRppsRemunerationCalculation(
        retirementPlanningRppsRemunerationCalculationEntity,
      ),
    );

    const updatedRetirementPlanningRppsEntity =
      new RetirementPlanningRppsEntity({
        id: retirementPlanningRpps.id,
        careerStartDate: retirementPlanningRpps.careerStartDate,
        publicServiceStartDate: retirementPlanningRpps.publicServiceStartDate,
        retirementPlanningRppsRemunerationCalculation:
          retirementPlanningRppsRemunerationCalculationEntity,
      });

    transactionOperations.push(
      this.retirementPlanningRppsCommandRepositoryGateway.updateRetirementPlanningRpps(
        updatedRetirementPlanningRppsEntity.id,
        updatedRetirementPlanningRppsEntity,
      ),
    );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: transactionOperations,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return UpdateRetirementPlanningRppsRemunerationResponseDto.build({
      retirementPlanningRppsId,
    });
  }
}

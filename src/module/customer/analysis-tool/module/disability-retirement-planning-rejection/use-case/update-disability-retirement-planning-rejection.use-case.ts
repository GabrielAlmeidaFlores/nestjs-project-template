import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/command/disability-retirement-planning-rejection.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-inss-benefit/command/disability-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';
import { UpdateDisabilityRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/update-disability-retirement-planning-rejection.request.dto';
import { UpdateDisabilityRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/update-disability-retirement-planning-rejection.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningRejectionUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionCommandRepositoryGateway: DisabilityRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway: DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    dto: UpdateDisabilityRetirementPlanningRejectionRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityRetirementPlanningRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const disabilityRetirementPlanningRejectionQueryResult =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const analysisToolClientId =
      dto.analysisToolClientId ??
      analysisToolRecordQueryResult.analysisToolClient.id;

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const disabilityRetirementPlanningRejection =
      new DisabilityRetirementPlanningRejectionEntity({
        id: disabilityRetirementPlanningRejectionId,
        createdAt: disabilityRetirementPlanningRejectionQueryResult.createdAt,
        updatedAt: disabilityRetirementPlanningRejectionQueryResult.updatedAt,
        deletedAt: disabilityRetirementPlanningRejectionQueryResult.deletedAt,
        analysisName:
          dto.analysisName ??
          disabilityRetirementPlanningRejectionQueryResult.analysisName,
        requestEntryDate:
          dto.requestEntryDate ??
          disabilityRetirementPlanningRejectionQueryResult.requestEntryDate,
        denialDate:
          dto.denialDate ??
          disabilityRetirementPlanningRejectionQueryResult.denialDate,
        disabilityRetirementPlanningRejectionResultId:
          disabilityRetirementPlanningRejectionQueryResult
            .disabilityRetirementPlanningRejectionResult?.id ?? null,
        requestedBenefitType:
          dto.requestedBenefitType ??
          disabilityRetirementPlanningRejectionQueryResult.requestedBenefitType,
        category:
          dto.category ??
          disabilityRetirementPlanningRejectionQueryResult.category,
        retirementType:
          dto.retirementType ??
          disabilityRetirementPlanningRejectionQueryResult.retirementType,
        denialReason:
          dto.denialReason ??
          disabilityRetirementPlanningRejectionQueryResult.denialReason,
        denialReasonDescription:
          dto.denialReasonDescription ??
          disabilityRetirementPlanningRejectionQueryResult.denialReasonDescription,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient,
      disabilityRetirementPlanningRejection,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateDenialTransaction =
      this.disabilityRetirementPlanningRejectionCommandRepositoryGateway.updateDisabilityRetirementPlanningRejection(
        disabilityRetirementPlanningRejectionId,
        disabilityRetirementPlanningRejection,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions =
      dto.inssBenefitNumber !== undefined
        ? this.buildInssBenefitUpdateTransactions(
            disabilityRetirementPlanningRejectionId,
            dto.inssBenefitNumber,
          )
        : [];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateDenialTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningRejectionResponseDto.build({
      disabilityRetirementPlanningRejectionId,
    });
  }

  private buildInssBenefitUpdateTransactions(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    inssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.disabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningRejectionId(
        disabilityRetirementPlanningRejectionId,
      );

    const createTransactions = inssBenefitNumbers.map((inssBenefit) =>
      this.disabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionInssBenefit(
        new DisabilityRetirementPlanningRejectionInssBenefitEntity({
          inssBenefit,
          disabilityRetirementPlanningRejectionId,
        }),
      ),
    );

    return [deleteTransaction, ...createTransactions];
  }
}

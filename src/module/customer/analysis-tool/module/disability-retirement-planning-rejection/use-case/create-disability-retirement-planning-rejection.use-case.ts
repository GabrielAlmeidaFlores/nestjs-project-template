import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/command/disability-retirement-planning-rejection.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-inss-benefit/command/disability-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';
import { CreateDisabilityRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/create-disability-retirement-planning-rejection.request.dto';
import { CreateDisabilityRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityRetirementPlanningRejectionUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionCommandRepositoryGateway: DisabilityRetirementPlanningRejectionCommandRepositoryGateway,
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
    dto: CreateDisabilityRetirementPlanningRejectionRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const disabilityRetirementPlanningRejection =
      new DisabilityRetirementPlanningRejectionEntity({
        analysisName: dto.analysisName ?? null,
        requestEntryDate: dto.requestEntryDate ?? null,
        denialDate: dto.denialDate ?? null,
        requestedBenefitType: dto.requestedBenefitType ?? null,
        category: dto.category ?? null,
        retirementType: dto.retirementType ?? null,
        denialReason: dto.denialReason ?? null,
        denialReasonDescription: dto.denialReasonDescription ?? null,
      });

    const inssBenefitEntities = (dto.inssBenefitNumber ?? []).map(
      (inssBenefit) =>
        new DisabilityRetirementPlanningRejectionInssBenefitEntity({
          inssBenefit,
          disabilityRetirementPlanningRejectionId:
            disabilityRetirementPlanningRejection.id,
        }),
    );

    await this.createOnDatabase(
      disabilityRetirementPlanningRejection,
      inssBenefitEntities,
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION,
      cnisFastAnalysis: null,
      disabilityRetirementPlanningRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateDisabilityRetirementPlanningRejectionResponseDto.build({
      disabilityRetirementPlanningRejectionId:
        disabilityRetirementPlanningRejection.id,
    });
  }

  private async createOnDatabase(
    disabilityRetirementPlanningRejection: DisabilityRetirementPlanningRejectionEntity,
    inssBenefitEntities: DisabilityRetirementPlanningRejectionInssBenefitEntity[],
  ): Promise<void> {
    const grantTransaction =
      this.disabilityRetirementPlanningRejectionCommandRepositoryGateway.createDisabilityRetirementPlanningRejection(
        disabilityRetirementPlanningRejection,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.disabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionInssBenefit(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      grantTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();
  }

  private async createAnalysisToolRecordOnDatabase(
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}

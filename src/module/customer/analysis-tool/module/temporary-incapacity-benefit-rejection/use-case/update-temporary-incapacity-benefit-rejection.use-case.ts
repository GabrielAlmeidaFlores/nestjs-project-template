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
import { TemporaryIncapacityBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/command/temporary-incapacity-benefit-rejection.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-inss-benefit/command/temporary-incapacity-benefit-rejection-inss-benefit.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.entity';
import { UpdateTemporaryIncapacityBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/update-temporary-incapacity-benefit-rejection.request.dto';
import { UpdateTemporaryIncapacityBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/update-temporary-incapacity-benefit-rejection.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitRejectionUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionCommandRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway,
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
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: UpdateTemporaryIncapacityBenefitRejectionRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryIncapacityBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryIncapacityBenefitRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
      );

    const existingResult =
      await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
        temporaryIncapacityBenefitRejectionId,
        TemporaryIncapacityBenefitRejectionNotFoundError,
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

    const temporaryIncapacityBenefitRejection =
      new TemporaryIncapacityBenefitRejectionEntity({
        id: temporaryIncapacityBenefitRejectionId,
        createdAt: existingResult.createdAt,
        updatedAt: existingResult.updatedAt,
        analysisName: dto.analysisName ?? existingResult.analysisName,
        requestEntryDate:
          dto.requestEntryDate ?? existingResult.requestEntryDate,
        denialDate: dto.denialDate ?? existingResult.denialDate,
        requestedBenefitType:
          dto.requestedBenefitType ?? existingResult.requestedBenefitType,
        category: dto.category ?? existingResult.category,
        denialReason: dto.denialReason ?? existingResult.denialReason,
        denialReasonDescription:
          dto.denialReasonDescription ?? existingResult.denialReasonDescription,
        condition: dto.condition ?? existingResult.condition,
        conditionDescription:
          dto.conditionDescription ?? existingResult.conditionDescription,
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
      temporaryIncapacityBenefitRejection,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateRejectionTransaction =
      this.temporaryIncapacityBenefitRejectionCommandRepositoryGateway.updateTemporaryIncapacityBenefitRejection(
        temporaryIncapacityBenefitRejectionId,
        temporaryIncapacityBenefitRejection,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions =
      dto.inssBenefitNumber !== undefined
        ? this.buildInssBenefitUpdateTransactions(
            temporaryIncapacityBenefitRejectionId,
            dto.inssBenefitNumber,
          )
        : [];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateRejectionTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();

    return UpdateTemporaryIncapacityBenefitRejectionResponseDto.build({
      temporaryIncapacityBenefitRejectionId,
    });
  }

  private buildInssBenefitUpdateTransactions(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    inssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.temporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitRejectionId(
        temporaryIncapacityBenefitRejectionId,
      );

    const createTransactions = inssBenefitNumbers.map((inssBenefit) =>
      this.temporaryIncapacityBenefitRejectionInssBenefitCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionInssBenefit(
        new TemporaryIncapacityBenefitRejectionInssBenefitEntity({
          inssBenefit,
          temporaryIncapacityBenefitRejectionId,
        }),
      ),
    );

    return [deleteTransaction, ...createTransactions];
  }
}

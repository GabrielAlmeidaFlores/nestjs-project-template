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
import { TemporaryIncapacityBenefitTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/command/temporary-incapacity-benefit-termination.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-inss-benefit/command/temporary-incapacity-benefit-termination-inss-benefit.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit.entity';
import { UpdateTemporaryIncapacityBenefitTerminationRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination.response.dto';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitTerminationUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitTerminationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationCommandRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationCommandRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway,
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
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UpdateTemporaryIncapacityBenefitTerminationRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTemporaryIncapacityBenefitTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        temporaryIncapacityBenefitTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    const existingResult =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
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

    const temporaryIncapacityBenefitTermination =
      new TemporaryIncapacityBenefitTerminationEntity({
        id: temporaryIncapacityBenefitTerminationId,
        createdAt: existingResult.createdAt,
        updatedAt: existingResult.updatedAt,
        analysisName: dto.analysisName ?? existingResult.analysisName,
        benefitTerminationDate:
          dto.benefitTerminationDate ?? existingResult.benefitTerminationDate,
        category: dto.category ?? existingResult.category,
        terminationReason:
          dto.terminationReason ?? existingResult.terminationReason,
        terminationReasonDescription:
          dto.terminationReasonDescription ??
          existingResult.terminationReasonDescription,
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
      temporaryIncapacityBenefitTermination,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateTerminationTransaction =
      this.temporaryIncapacityBenefitTerminationCommandRepositoryGateway.updateTemporaryIncapacityBenefitTermination(
        temporaryIncapacityBenefitTerminationId,
        temporaryIncapacityBenefitTermination,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions =
      dto.inssBenefitNumber !== undefined
        ? this.buildInssBenefitUpdateTransactions(
            temporaryIncapacityBenefitTerminationId,
            dto.inssBenefitNumber,
          )
        : [];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTerminationTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();

    return UpdateTemporaryIncapacityBenefitTerminationResponseDto.build({
      temporaryIncapacityBenefitTerminationId,
    });
  }

  private buildInssBenefitUpdateTransactions(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    inssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.temporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      );

    const createTransactions = inssBenefitNumbers.map((inssBenefit) =>
      this.temporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationInssBenefit(
        new TemporaryIncapacityBenefitTerminationInssBenefitEntity({
          inssBenefit,
          temporaryIncapacityBenefitTerminationId,
        }),
      ),
    );

    return [deleteTransaction, ...createTransactions];
  }
}

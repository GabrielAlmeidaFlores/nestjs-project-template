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
import { PermanentIncapacityBenefitTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/command/permanent-incapacity-benefit-terminated.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-inss-benefit/command/permanent-incapacity-benefit-terminated-inss-benefit.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity';
import { UpdatePermanentIncapacityBenefitTerminatedRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/update-permanent-incapacity-benefit-terminated.request.dto';
import { UpdatePermanentIncapacityBenefitTerminatedResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/update-permanent-incapacity-benefit-terminated.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdatePermanentIncapacityBenefitTerminatedUseCase {
  protected readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedCommandRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedCommandRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway,
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
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: UpdatePermanentIncapacityBenefitTerminatedRequestDto,
  ): Promise<UpdatePermanentIncapacityBenefitTerminatedResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPermanentIncapacityBenefitTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        permanentIncapacityBenefitTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
      );

    const existingResult =
      await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
        permanentIncapacityBenefitTerminatedId,
        PermanentIncapacityBenefitTerminatedNotFoundError,
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

    const permanentIncapacityBenefitTerminated =
      new PermanentIncapacityBenefitTerminatedEntity({
        id: permanentIncapacityBenefitTerminatedId,
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
      permanentIncapacityBenefitTerminated,
      cnisFastAnalysis: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateTerminationTransaction =
      this.permanentIncapacityBenefitTerminatedCommandRepositoryGateway.updatePermanentIncapacityBenefitTerminated(
        permanentIncapacityBenefitTerminatedId,
        permanentIncapacityBenefitTerminated,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecordQueryResult.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions =
      dto.inssBenefitNumber !== undefined
        ? this.buildInssBenefitUpdateTransactions(
            permanentIncapacityBenefitTerminatedId,
            dto.inssBenefitNumber,
          )
        : [];

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTerminationTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();

    return UpdatePermanentIncapacityBenefitTerminatedResponseDto.build({
      permanentIncapacityBenefitTerminatedId,
    });
  }

  private buildInssBenefitUpdateTransactions(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    inssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.permanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway.deleteAllByPermanentIncapacityBenefitTerminatedId(
        permanentIncapacityBenefitTerminatedId,
      );

    const createTransactions = inssBenefitNumbers.map((inssBenefit) =>
      this.permanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedInssBenefit(
        new PermanentIncapacityBenefitTerminatedInssBenefitEntity({
          inssBenefit,
          permanentIncapacityBenefitTerminatedId,
        }),
      ),
    );

    return [deleteTransaction, ...createTransactions];
  }
}

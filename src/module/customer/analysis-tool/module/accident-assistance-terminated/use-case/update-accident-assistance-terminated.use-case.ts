import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { GetAccidentAssistanceTerminatedBenefitQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-benefit.query.result';
import { GetAccidentAssistanceTerminatedLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/result/get-accident-assistance-terminated-legal-proceeding.query.result';
import { AccidentAssistanceTerminatedBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-benefit/command/accident-assistance-terminated-benefit.command.repository.gateway';
import { AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-legal-proceeding/command/accident-assistance-terminated-legal-proceeding.command.repository.gateway';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import { UpdateAccidentAssistanceTerminatedRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/update-accident-assistance-terminated.request.dto';
import { UpdateAccidentAssistanceTerminatedResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/update-accident-assistance-terminated.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateAccidentAssistanceTerminatedUseCase {
  protected readonly _type = UpdateAccidentAssistanceTerminatedUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedCommandRepositoryGateway: AccidentAssistanceTerminatedCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedBenefitCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedBenefitCommandRepositoryGateway: AccidentAssistanceTerminatedBenefitCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway: AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    dto: UpdateAccidentAssistanceTerminatedRequestDto,
  ): Promise<UpdateAccidentAssistanceTerminatedResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const accidentAssistanceTerminatedQueryResult =
      await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
        accidentAssistanceTerminatedId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentAssistanceTerminatedIdAndOrganizationIdAndAuthIdentityIdOrFail(
        accidentAssistanceTerminatedId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentAssistanceTerminatedNotFoundError,
      );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json?.analysisToolClientId ??
          analysisToolRecordQueryResult.analysisToolClient.id,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const accidentAssistanceTerminated = new AccidentAssistanceTerminatedEntity(
      {
        id: accidentAssistanceTerminatedQueryResult.id,
        der: dto.json?.der ?? accidentAssistanceTerminatedQueryResult.der,
        denialDate:
          dto.json?.denialDate ??
          accidentAssistanceTerminatedQueryResult.denialDate,
        category:
          dto.json?.category ??
          accidentAssistanceTerminatedQueryResult.category,
        inssPassword:
          dto.json?.inssPassword !== undefined
            ? dto.json.inssPassword
            : accidentAssistanceTerminatedQueryResult.inssPassword,
        analysisName:
          dto.json?.analysisName !== undefined
            ? dto.json.analysisName
            : accidentAssistanceTerminatedQueryResult.analysisName,
        benefitCessationReason:
          dto.json?.benefitCessationReason ??
          accidentAssistanceTerminatedQueryResult.benefitCessationReason,
        hadPreviousIncapacityBenefit:
          dto.json?.hadPreviousIncapacityBenefit ??
          accidentAssistanceTerminatedQueryResult.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber:
          dto.json?.previousIncapacityBenefitNumber !== undefined
            ? dto.json.previousIncapacityBenefitNumber
            : accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          dto.json?.previousIncapacityBenefitStartDate !== undefined
            ? dto.json.previousIncapacityBenefitStartDate
            : accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          dto.json?.previousIncapacityBenefitEndDate !== undefined
            ? dto.json.previousIncapacityBenefitEndDate
            : accidentAssistanceTerminatedQueryResult.previousIncapacityBenefitEndDate,
        extensionRequestStatus:
          dto.json?.extensionRequestStatus !== undefined
            ? dto.json.extensionRequestStatus
            : accidentAssistanceTerminatedQueryResult.extensionRequestStatus,
        createdBy: accidentAssistanceTerminatedQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      },
    );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      accidentAssistanceTerminated,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          accidentAssistanceTerminated,
          accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedBenefit,
          dto.json.inssBenefitNumber,
        );
      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          accidentAssistanceTerminated,
          accidentAssistanceTerminatedQueryResult.accidentAssistanceTerminatedLegalProceeding,
          dto.json.legalProceedingNumber,
        );
      transactions.push(...legalProceedingTransactions);
    }

    const accidentAssistanceTerminatedTransaction =
      this.accidentAssistanceTerminatedCommandRepositoryGateway.updateAccidentAssistanceTerminated(
        accidentAssistanceTerminated.id,
        accidentAssistanceTerminated,
      );
    transactions.push(accidentAssistanceTerminatedTransaction);

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );
    transactions.push(analysisToolRecordTransaction);

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(
        transactionsWithActivity,
      );
    await executeTransactions.commit();

    return UpdateAccidentAssistanceTerminatedResponseDto.build({
      accidentAssistanceTerminatedId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    accidentAssistanceTerminated: AccidentAssistanceTerminatedEntity,
    currentBenefits: GetAccidentAssistanceTerminatedBenefitQueryResult[],
    newInssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteCurrent =
      currentBenefits.length > 0
        ? [
            this.accidentAssistanceTerminatedBenefitCommandRepositoryGateway.deleteAccidentAssistanceTerminatedBenefitByAccidentAssistanceTerminatedId(
              accidentAssistanceTerminated.id,
            ),
          ]
        : [];

    const createNew = newInssBenefitNumbers.map((value) => {
      const entity = new AccidentAssistanceTerminatedBenefitEntity({
        inssBenefitNumber: value,
      });

      return this.accidentAssistanceTerminatedBenefitCommandRepositoryGateway.createAccidentAssistanceTerminatedBenefit(
        accidentAssistanceTerminated.id,
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    accidentAssistanceTerminated: AccidentAssistanceTerminatedEntity,
    currentLegalProceedings: GetAccidentAssistanceTerminatedLegalProceedingQueryResult[],
    newLegalProceedingNumbers: string[],
  ): TransactionType[] {
    const deleteCurrent =
      currentLegalProceedings.length > 0
        ? [
            this.accidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway.deleteAccidentAssistanceTerminatedLegalProceedingByAccidentAssistanceTerminatedId(
              accidentAssistanceTerminated.id,
            ),
          ]
        : [];

    const createNew = newLegalProceedingNumbers.map((value) => {
      const entity = new AccidentAssistanceTerminatedLegalProceedingEntity({
        legalProceedingNumber: value,
      });

      return this.accidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway.createAccidentAssistanceTerminatedLegalProceeding(
        accidentAssistanceTerminated.id,
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}

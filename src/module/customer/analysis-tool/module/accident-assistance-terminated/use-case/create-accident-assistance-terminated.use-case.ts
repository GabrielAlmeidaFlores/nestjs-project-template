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
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AccidentAssistanceTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/command/accident-assistance-terminated.command.repository.gateway';
import { AccidentAssistanceTerminatedBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-benefit/command/accident-assistance-terminated-benefit.command.repository.gateway';
import { AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-legal-proceeding/command/accident-assistance-terminated-legal-proceeding.command.repository.gateway';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import { CreateAccidentAssistanceTerminatedRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated.request.dto';
import { CreateAccidentAssistanceTerminatedResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAccidentAssistanceTerminatedUseCase {
  protected readonly _type = CreateAccidentAssistanceTerminatedUseCase.name;

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
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateAccidentAssistanceTerminatedRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedResponseDto> {
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
        dto.json.analysisToolClientId,
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
        der: dto.json.der,
        denialDate: dto.json.denialDate,
        category: dto.json.category,
        ...(dto.json.inssPassword !== undefined && {
          inssPassword: dto.json.inssPassword,
        }),
        ...(dto.json.analysisName !== undefined && {
          analysisName: dto.json.analysisName,
        }),
        benefitCessationReason: dto.json.benefitCessationReason,
        hadPreviousIncapacityBenefit: dto.json.hadPreviousIncapacityBenefit,
        ...(dto.json.previousIncapacityBenefitNumber !== undefined && {
          previousIncapacityBenefitNumber:
            dto.json.previousIncapacityBenefitNumber,
        }),
        ...(dto.json.previousIncapacityBenefitStartDate !== undefined && {
          previousIncapacityBenefitStartDate:
            dto.json.previousIncapacityBenefitStartDate,
        }),
        ...(dto.json.previousIncapacityBenefitEndDate !== undefined && {
          previousIncapacityBenefitEndDate:
            dto.json.previousIncapacityBenefitEndDate,
        }),
        ...(dto.json.extensionRequestStatus !== undefined && {
          extensionRequestStatus: dto.json.extensionRequestStatus,
        }),
        dib: dto.json.dib ?? null,
        dcb: dto.json.dcb ?? null,
        ...(dto.json.mainInssBenefitNumber !== undefined && {
          inssBenefitNumber: dto.json.mainInssBenefitNumber,
        }),
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      },
    );

    const accidentAssistanceTerminatedBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new AccidentAssistanceTerminatedBenefitEntity({
              inssBenefitNumber: value,
            });
          })
        : [];

    const accidentAssistanceTerminatedLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new AccidentAssistanceTerminatedLegalProceedingEntity({
              legalProceedingNumber: value,
            });
          })
        : [];

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED,
      accidentAssistanceTerminated,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      accidentAssistanceTerminated,
      accidentAssistanceTerminatedBenefit,
      accidentAssistanceTerminatedLegalProceeding,
      analysisToolRecord,
    );

    return CreateAccidentAssistanceTerminatedResponseDto.build({
      accidentAssistanceTerminatedId: accidentAssistanceTerminated.id,
    });
  }

  private async createOnDatabase(
    accidentAssistanceTerminated: AccidentAssistanceTerminatedEntity,
    accidentAssistanceTerminatedBenefit: AccidentAssistanceTerminatedBenefitEntity[],
    accidentAssistanceTerminatedLegalProceeding: AccidentAssistanceTerminatedLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const benefitTransactions = accidentAssistanceTerminatedBenefit.map(
      (value) => {
        return this.accidentAssistanceTerminatedBenefitCommandRepositoryGateway.createAccidentAssistanceTerminatedBenefit(
          accidentAssistanceTerminated.id,
          value,
        );
      },
    );

    const legalProceedingTransactions =
      accidentAssistanceTerminatedLegalProceeding.map((value) => {
        return this.accidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway.createAccidentAssistanceTerminatedLegalProceeding(
          accidentAssistanceTerminated.id,
          value,
        );
      });

    const accidentAssistanceTerminatedTransaction =
      this.accidentAssistanceTerminatedCommandRepositoryGateway.createAccidentAssistanceTerminated(
        accidentAssistanceTerminated,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          accidentAssistanceTerminatedTransaction,
          ...benefitTransactions,
          ...legalProceedingTransactions,
          analysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();
  }
}

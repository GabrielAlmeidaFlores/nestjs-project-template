import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationEntity } from '@module/ai/domain/schema/entity/conversation/conversation.entity';
import { ChatPersonaTypeEnum } from '@module/ai/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-inss-benefit/command/retirement-planning-rgps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-legal-proceeding/command/retirement-planning-rgps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';
import { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateRetirementPlanningRgpsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps.request.dto';
import { CreateRetirementPlanningRgpsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRetirementPlanningRgpsUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsCommandRepositoryGateway)
    private readonly retirementPlanningRgpsCommandRepositoryGateway: RetirementPlanningRgpsCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsInssBenefitCommandRepositoryGateway)
    private readonly retirementPlanningRgpsInssBenefitCommandRepositoryGateway: RetirementPlanningRgpsInssBenefitCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway)
    private readonly retirementPlanningRgpsLegalProceedingCommandRepositoryGateway: RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPlanningRgpsRequestDto,
  ): Promise<CreateRetirementPlanningRgpsResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );
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

    const retirementPlanningRgpsResult = new RetirementPlanningRgpsResultEntity(
      {
        clientName: analysisToolClientQueryResult.name,
        clientFederalDocument: analysisToolClientQueryResult.federalDocument,
        clientBirthDate: analysisToolClientQueryResult.birthDate,
        clientLastAffiliationDate: null,
      },
    );

    const retirementPlanningRgps = new RetirementPlanningRgpsEntity({
      cnisDocument: null,
      retirementPlanningRgpsResult,
    });

    const retirementPlanningRgpsInssBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new RetirementPlanningRgpsInssBenefitEntity({
              inssBenefitNumber: value,
              retirementPlanningRgps,
            });
          })
        : [];

    const retirementPlanningRgpsLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new RetirementPlanningRgpsLegalProceedingEntity({
              legalProceedingNumber: value,
              retirementPlanningRgps,
            });
          })
        : [];

    await this.createOnDatabase(
      retirementPlanningRgps,
      retirementPlanningRgpsInssBenefit,
      retirementPlanningRgpsLegalProceeding,
      retirementPlanningRgpsResult,
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

    const conversation = new ConversationEntity({
      customerId: new CustomerId(customer.id.toString()),
      assistantType: ChatPersonaTypeEnum.DUVIDAS_PREVIDENCIARIAS,
      status: null,
      lastAIMessageAt: null,
      contextPrompt: JSON.stringify(
        retirementPlanningRgps.retirementPlanningRgpsResult,
      ),
      archivedAt: null,
      createdAt: new Date(),
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.RETIREMENT_PLANNING_RGPS,
      cnisFastAnalysis: null,
      retirementPlanningRgps,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      conversation,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateRetirementPlanningRgpsResponseDto.build({
      retirementPlanningRgpsId: retirementPlanningRgps.id,
    });
  }

  private async createOnDatabase(
    retirementPlanningRgps: RetirementPlanningRgpsEntity,
    retirementPlanningRgpsInssBenefit: RetirementPlanningRgpsInssBenefitEntity[],
    retirementPlanningRgpsLegalProceeding: RetirementPlanningRgpsLegalProceedingEntity[],
    retirementPlanningRgpsResult: RetirementPlanningRgpsResultEntity,
  ): Promise<void> {
    const retirementPlanningRgpsInssBenefitTransaction =
      retirementPlanningRgpsInssBenefit.map((value) => {
        return this.retirementPlanningRgpsInssBenefitCommandRepositoryGateway.createRetirementPlanningRgpsInssBenefit(
          value,
        );
      });

    const retirementPlanningRgpsLegalProceedingTransaction =
      retirementPlanningRgpsLegalProceeding.map((value) => {
        return this.retirementPlanningRgpsLegalProceedingCommandRepositoryGateway.createRetirementPlanningRgpsLegalProceeding(
          value,
        );
      });

    const retirementPlanningRgpsResultTransaction =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.createRetirementPlanningRgpsResult(
        retirementPlanningRgpsResult,
      );
    const retirementPlanningRgpsTransaction =
      this.retirementPlanningRgpsCommandRepositoryGateway.createRetirementPlanningRgps(
        retirementPlanningRgps,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsResultTransaction,
      retirementPlanningRgpsTransaction,
      ...retirementPlanningRgpsInssBenefitTransaction,
      ...retirementPlanningRgpsLegalProceedingTransaction,
    ]);

    await transactions.commit();
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

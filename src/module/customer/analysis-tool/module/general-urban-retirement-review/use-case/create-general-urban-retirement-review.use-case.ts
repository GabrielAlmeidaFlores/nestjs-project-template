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
import { GeneralUrbanRetirementReviewCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/command/general-urban-retirement-review.command.repository.gateway';
import { GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-inss-benefit/command/general-urban-retirement-review-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-legal-proceeding/command/general-urban-retirement-review-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CreateGeneralUrbanRetirementReviewRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review.request.dto';
import { CreateGeneralUrbanRetirementReviewResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementReviewUseCase {
  protected readonly _type = CreateGeneralUrbanRetirementReviewUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewCommandRepositoryGateway: GeneralUrbanRetirementReviewCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewInssBenefitCommandRepositoryGateway: GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewLegalProceedingCommandRepositoryGateway: GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
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
    dto: CreateGeneralUrbanRetirementReviewRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewResponseDto> {
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

    const generalUrbanRetirementReviewResult =
      new GeneralUrbanRetirementReviewResultEntity({
        clientName: analysisToolClientQueryResult.name,
        clientFederalDocument: analysisToolClientQueryResult.federalDocument,
        clientBirthDate: analysisToolClientQueryResult.birthDate,
        clientLastAffiliationDate: null,
        benefitAwardLetterAnalysis: null,
        benefitAwardLetterAnalysisRaw: null,
        firstAnalysis: null,
        generalUrbanRetirementReviewCompleteAnalysis: null,
        generalUrbanRetirementReviewSimplifiedAnalysis: null,
        generalUrbanRetirementReviewCompleteAnalysisDownload: null,
      });

    const generalUrbanRetirementReview = new GeneralUrbanRetirementReviewEntity(
      {
        cnisDocument: null,
        benefitAwardLetterDocument: null,
        analysisName: dto.json.analysisName ?? null,
        category: dto.json.category ?? null,
        myInssPassword: dto.json.myInssPassword ?? null,
        generalUrbanRetirementReviewResult,
      },
    );

    const generalUrbanRetirementReviewInssBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new GeneralUrbanRetirementReviewInssBenefitEntity({
              inssBenefitNumber: value,
              generalUrbanRetirementReview,
            });
          })
        : [];

    const generalUrbanRetirementReviewLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new GeneralUrbanRetirementReviewLegalProceedingEntity({
              legalProceedingNumber: value,
              generalUrbanRetirementReview,
            });
          })
        : [];

    await this.createOnDatabase(
      generalUrbanRetirementReview,
      generalUrbanRetirementReviewInssBenefit,
      generalUrbanRetirementReviewLegalProceeding,
      generalUrbanRetirementReviewResult,
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
      type: AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW,
      cnisFastAnalysis: null,
      generalUrbanRetirementReview,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateGeneralUrbanRetirementReviewResponseDto.build({
      generalUrbanRetirementReviewId: generalUrbanRetirementReview.id,
    });
  }

  private async createOnDatabase(
    generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity,
    generalUrbanRetirementReviewInssBenefit: GeneralUrbanRetirementReviewInssBenefitEntity[],
    generalUrbanRetirementReviewLegalProceeding: GeneralUrbanRetirementReviewLegalProceedingEntity[],
    generalUrbanRetirementReviewResult: GeneralUrbanRetirementReviewResultEntity,
  ): Promise<void> {
    const inssBenefitTransactions = generalUrbanRetirementReviewInssBenefit.map(
      (value) => {
        return this.generalUrbanRetirementReviewInssBenefitCommandRepositoryGateway.createGeneralUrbanRetirementReviewInssBenefit(
          value,
        );
      },
    );

    const legalProceedingTransactions =
      generalUrbanRetirementReviewLegalProceeding.map((value) => {
        return this.generalUrbanRetirementReviewLegalProceedingCommandRepositoryGateway.createGeneralUrbanRetirementReviewLegalProceeding(
          value,
        );
      });

    const resultTransaction =
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.createGeneralUrbanRetirementReviewResult(
        generalUrbanRetirementReviewResult,
      );
    const reviewTransaction =
      this.generalUrbanRetirementReviewCommandRepositoryGateway.createGeneralUrbanRetirementReview(
        generalUrbanRetirementReview,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      resultTransaction,
      reviewTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
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

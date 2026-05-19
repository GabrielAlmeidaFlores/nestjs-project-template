import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementReviewCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/command/general-urban-retirement-review.command.repository.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-inss-benefit/command/general-urban-retirement-review-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-legal-proceeding/command/general-urban-retirement-review-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { UpdateGeneralUrbanRetirementReviewRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/update-general-urban-retirement-review.request.dto';
import { UpdateGeneralUrbanRetirementReviewResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateGeneralUrbanRetirementReviewUseCase {
  protected readonly _type = UpdateGeneralUrbanRetirementReviewUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewCommandRepositoryGateway: GeneralUrbanRetirementReviewCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewInssBenefitCommandRepositoryGateway: GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewLegalProceedingCommandRepositoryGateway: GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    dto: UpdateGeneralUrbanRetirementReviewRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementReviewResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementReviewId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const currentReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const transactions: TransactionType[] = [];

    const updatedReview = new GeneralUrbanRetirementReviewEntity({
      id: generalUrbanRetirementReviewId,
      cnisDocument: currentReview.cnisDocument,
      benefitAwardLetterDocument: currentReview.benefitAwardLetterDocument,
      analysisName: dto.analysisName ?? currentReview.analysisName ?? null,
      category: dto.category ?? currentReview.category ?? null,
      myInssPassword:
        dto.myInssPassword ?? currentReview.myInssPassword ?? null,
      generalUrbanRetirementReviewResult:
        currentReview.generalUrbanRetirementReviewResult ?? null,
    });

    transactions.push(
      this.generalUrbanRetirementReviewCommandRepositoryGateway.updateGeneralUrbanRetirementReview(
        generalUrbanRetirementReviewId,
        updatedReview,
      ),
    );

    if (dto.analysisToolClientId !== undefined) {
      const analysisToolClient =
        await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
          dto.analysisToolClientId,
          organizationSessionData.organizationId,
          AnalysisToolClientNotFoundError,
        );

      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordAnalysisToolClient(
          analysisToolRecord.id,
          dto.analysisToolClientId,
        ),
      );

      if (currentReview.generalUrbanRetirementReviewResult !== null) {
        transactions.push(
          this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
            currentReview.generalUrbanRetirementReviewResult.id,
            new GeneralUrbanRetirementReviewResultEntity({
              ...currentReview.generalUrbanRetirementReviewResult,
              clientName: analysisToolClient.name,
              clientFederalDocument: analysisToolClient.federalDocument,
              clientBirthDate: analysisToolClient.birthDate,
            }),
          ),
        );
      }
    }

    const generalUrbanRetirementReviewReference =
      new GeneralUrbanRetirementReviewEntity({
        id: generalUrbanRetirementReviewId,
      });

    if (dto.inssBenefitNumber !== undefined) {
      for (const inssBenefit of currentReview.generalUrbanRetirementReviewBenefit ??
        []) {
        transactions.push(
          this.generalUrbanRetirementReviewInssBenefitCommandRepositoryGateway.deleteGeneralUrbanRetirementReviewInssBenefit(
            inssBenefit.id,
          ),
        );
      }

      for (const inssBenefitNumber of dto.inssBenefitNumber) {
        transactions.push(
          this.generalUrbanRetirementReviewInssBenefitCommandRepositoryGateway.createGeneralUrbanRetirementReviewInssBenefit(
            new GeneralUrbanRetirementReviewInssBenefitEntity({
              inssBenefitNumber,
              generalUrbanRetirementReview:
                generalUrbanRetirementReviewReference,
            }),
          ),
        );
      }
    }

    if (dto.legalProceedingNumber !== undefined) {
      for (const legalProceeding of currentReview.generalUrbanRetirementReviewLegalProceeding ??
        []) {
        transactions.push(
          this.generalUrbanRetirementReviewLegalProceedingCommandRepositoryGateway.deleteGeneralUrbanRetirementReviewLegalProceeding(
            legalProceeding.id,
          ),
        );
      }

      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        transactions.push(
          this.generalUrbanRetirementReviewLegalProceedingCommandRepositoryGateway.createGeneralUrbanRetirementReviewLegalProceeding(
            new GeneralUrbanRetirementReviewLegalProceedingEntity({
              legalProceedingNumber,
              generalUrbanRetirementReview:
                generalUrbanRetirementReviewReference,
            }),
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateGeneralUrbanRetirementReviewResponseDto.build({
      generalUrbanRetirementReviewId,
    });
  }
}

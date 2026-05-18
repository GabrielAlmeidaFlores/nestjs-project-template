import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { UpdateGeneralUrbanRetirementReviewResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review-result.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { GeneralUrbanRetirementReviewResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateGeneralUrbanRetirementReviewClientUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementReviewClientUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    analysisToolClientId: AnalysisToolClientId,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<UpdateGeneralUrbanRetirementReviewResultResponseDto> {
    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementReviewIdAndOrganizationIdAndAuthIdentityIdOrFail(
      generalUrbanRetirementReviewId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      GeneralUrbanRetirementReviewNotFoundError,
    );

    const analysisToolClient =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    if (!generalUrbanRetirementReview.generalUrbanRetirementReviewResult) {
      throw new GeneralUrbanRetirementReviewResultNotFoundError();
    }

    const updatedResult = new GeneralUrbanRetirementReviewResultEntity({
      ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
      clientName: analysisToolClient.name,
      clientFederalDocument: analysisToolClient.federalDocument,
      clientBirthDate: analysisToolClient.birthDate,
    });

    const updateTransaction =
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        generalUrbanRetirementReview.generalUrbanRetirementReviewResult.id,
        updatedResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateGeneralUrbanRetirementReviewResultResponseDto.build({
      generalUrbanRetirementReviewId,
    });
  }
}

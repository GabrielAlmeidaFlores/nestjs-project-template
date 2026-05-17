import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientInterviewFormCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/command/analysis-tool-client-interview-form.command.repository.gateway';
import { AnalysisToolClientInterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/analysis-tool-client-interview-form.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientInterviewFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/analysis-tool-client-interview-form.entity';
import { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';
import { UpsertAnalysisToolClientInterviewFormRequestDto } from '@module/customer/analysis-tool/dto/request/upsert-analysis-tool-client-interview-form.request.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpsertAnalysisToolClientInterviewFormUseCase {
  protected readonly _type = UpsertAnalysisToolClientInterviewFormUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientInterviewFormCommandRepositoryGateway)
    private readonly interviewFormCommandRepositoryGateway: AnalysisToolClientInterviewFormCommandRepositoryGateway,
    @Inject(AnalysisToolClientInterviewFormQueryRepositoryGateway)
    private readonly interviewFormQueryRepositoryGateway: AnalysisToolClientInterviewFormQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
    organizationSessionData: OrganizationSessionDataModel,
    dto: UpsertAnalysisToolClientInterviewFormRequestDto,
  ): Promise<{ success: boolean }> {
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

    const existingForm =
      await this.interviewFormQueryRepositoryGateway.findByAnalysisToolClientId(
        analysisToolClientId,
      );

    const interviewFormEntity = new AnalysisToolClientInterviewFormEntity({
      ...dto,
      id: existingForm?.id ?? new AnalysisToolClientInterviewFormId(),
      analysisToolClient,
    });

    const transactions: TransactionType[] = [];

    if (existingForm !== null) {
      transactions.push(
        this.interviewFormCommandRepositoryGateway.updateAnalysisToolClientInterviewForm(
          interviewFormEntity.id,
          interviewFormEntity,
        ),
      );
    } else {
      transactions.push(
        this.interviewFormCommandRepositoryGateway.createAnalysisToolClientInterviewForm(
          interviewFormEntity,
        ),
      );
    }

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executeTransactions.commit();

    return { success: true };
  }
}

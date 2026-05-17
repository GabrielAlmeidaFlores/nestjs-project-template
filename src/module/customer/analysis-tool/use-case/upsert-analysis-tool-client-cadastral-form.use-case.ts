import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientCadastralFormCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/command/analysis-tool-client-cadastral-form.command.repository.gateway';
import { AnalysisToolClientCadastralFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/analysis-tool-client-cadastral-form.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientCadastralFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/analysis-tool-client-cadastral-form.entity';
import { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';
import { UpsertAnalysisToolClientCadastralFormRequestDto } from '@module/customer/analysis-tool/dto/request/upsert-analysis-tool-client-cadastral-form.request.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class UpsertAnalysisToolClientCadastralFormUseCase {
  protected readonly _type = UpsertAnalysisToolClientCadastralFormUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCadastralFormCommandRepositoryGateway)
    private readonly cadastralFormCommandRepositoryGateway: AnalysisToolClientCadastralFormCommandRepositoryGateway,
    @Inject(AnalysisToolClientCadastralFormQueryRepositoryGateway)
    private readonly cadastralFormQueryRepositoryGateway: AnalysisToolClientCadastralFormQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
    organizationSessionData: OrganizationSessionDataModel,
    dto: UpsertAnalysisToolClientCadastralFormRequestDto,
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
      await this.cadastralFormQueryRepositoryGateway.findByAnalysisToolClientId(
        analysisToolClientId,
      );

    const cadastralFormEntity = new AnalysisToolClientCadastralFormEntity({
      ...dto,
      id: existingForm?.id ?? new AnalysisToolClientCadastralFormId(),
      analysisToolClient,
    });

    const transactions: TransactionType[] = [];

    if (existingForm !== null) {
      transactions.push(
        this.cadastralFormCommandRepositoryGateway.updateAnalysisToolClientCadastralForm(
          cadastralFormEntity.id,
          cadastralFormEntity,
        ),
      );
    } else {
      transactions.push(
        this.cadastralFormCommandRepositoryGateway.createAnalysisToolClientCadastralForm(
          cadastralFormEntity,
        ),
      );
    }

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executeTransactions.commit();

    return { success: true };
  }
}

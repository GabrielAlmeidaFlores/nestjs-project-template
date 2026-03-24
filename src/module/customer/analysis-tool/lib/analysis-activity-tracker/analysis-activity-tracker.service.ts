import { Inject, Injectable } from '@nestjs/common';

import { SystemActivitiesCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/command/system-activities.command.repository.gateway';
import { AnalysisActivityMessageFactory } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-message.factory';
import {
  AnalysisActivityTrackerGateway,
  AppendAnalysisActivityTransactionParamsType,
} from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class AnalysisActivityTrackerService implements AnalysisActivityTrackerGateway {
  protected readonly _type = AnalysisActivityTrackerService.name;

  public constructor(
    @Inject(SystemActivitiesCommandRepositoryGateway)
    private readonly systemActivitiesCommandRepositoryGateway: SystemActivitiesCommandRepositoryGateway,
  ) {}

  public appendActivityTransaction(
    params: AppendAnalysisActivityTransactionParamsType,
  ): TransactionType[] {
    const message = AnalysisActivityMessageFactory.build(
      params.analysisType,
      params.action,
    );
    const createSystemActivityParams = {
      title: message.title,
      description: message.description,
      ...(params.organizationMemberId !== undefined && {
        organizationMemberId: params.organizationMemberId,
      }),
      ...(params.analysisToolClientId !== undefined && {
        analysisToolClientId: params.analysisToolClientId,
      }),
      ...(params.analysisToolRecordId !== undefined && {
        analysisToolRecordId: params.analysisToolRecordId,
      }),
    };

    const createActivityTransaction =
      this.systemActivitiesCommandRepositoryGateway.createSystemActivity(
        createSystemActivityParams,
      );

    return [...params.transactions, createActivityTransaction];
  }
}

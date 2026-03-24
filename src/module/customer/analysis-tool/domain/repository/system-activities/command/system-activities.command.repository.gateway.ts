import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export type CreateSystemActivitiesParamsType = {
  title: string;
  description: string;
  organizationMemberId?: string;
  analysisToolClientId?: string;
  analysisToolRecordId?: string;
};

export abstract class SystemActivitiesCommandRepositoryGateway {
  public abstract createSystemActivity(
    params: CreateSystemActivitiesParamsType,
  ): TransactionType;
}

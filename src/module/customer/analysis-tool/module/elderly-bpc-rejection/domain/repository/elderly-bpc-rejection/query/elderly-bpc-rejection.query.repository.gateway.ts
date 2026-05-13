import type { GetElderlyBpcRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/result/get-elderly-bpc-rejection-with-relations.query.result';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';

export abstract class ElderlyBpcRejectionQueryRepositoryGateway {
  public abstract findOneByElderlyBpcRejectionIdOrFailWithRelations<
    E extends new (...args: unknown[]) => Error,
  >(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    errorClass: E,
  ): Promise<GetElderlyBpcRejectionWithRelationsQueryResult>;
}

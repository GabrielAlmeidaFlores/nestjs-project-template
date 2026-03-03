import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import type { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';

export abstract class AdministrativeRequestGeneratorCommandRepositoryGateway {
  public abstract updateAdministrativeRequestGenerator(
    id: AdministrativeRequestGeneratorId,
    props: AdministrativeRequestGeneratorEntity,
  ): TransactionType;

  public abstract createAdministrativeRequestGenerator(
    props: AdministrativeRequestGeneratorEntity,
  ): TransactionType;
}

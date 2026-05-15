import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import type { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';

export abstract class BpcDisabilityGrantDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantDocument(
    props: BpcDisabilityGrantDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityGrantDocument(
    props: BpcDisabilityGrantDocumentEntity[],
  ): TransactionType[];

  public abstract deleteAllByBpcDisabilityGrantId(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType;

  public abstract deleteByBpcDisabilityGrantIdAndType(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    type: BpcDisabilityGrantDocumentTypeEnum,
  ): TransactionType;
}

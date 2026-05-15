import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/bpc-disability-grant-legal-representative-of-a-minor.entity';

export abstract class BpcDisabilityGrantLegalRepresentativeOfAMinorCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantLegalRepresentativeOfAMinor(
    props: BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
  ): TransactionType;

  public abstract updateBpcDisabilityGrantLegalRepresentativeOfAMinor(
    bpcDisabilityGrantLegalRepresentativeOfAMinorId: BpcDisabilityGrantLegalRepresentativeOfAMinorId,
    props: BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityGrantLegalRepresentativeOfAMinor(
    bpcDisabilityGrantLegalRepresentativeOfAMinorId: BpcDisabilityGrantLegalRepresentativeOfAMinorId,
  ): TransactionType;

  public abstract deleteAllByBpcDisabilityGrantId(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType;
}

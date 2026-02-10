import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpeechGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity';
import type { SpeechGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/value-object/speech-generator-legal-proceeding-id/speech-generator-legal-proceeding-id.value-object';

export abstract class SpeechGeneratorLegalProceedingCommandRepositoryGateway {
  public abstract createSpeechGeneratorLegalProceeding(
    props: SpeechGeneratorLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteSpeechGeneratorLegalProceeding(
    id: SpeechGeneratorLegalProceedingId,
  ): TransactionType;
}

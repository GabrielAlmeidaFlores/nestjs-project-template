import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import type { SpeechGeneratorResultId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/value-object/speech-generator-result-id/speech-generator-result-id.value-object';

export abstract class SpeechGeneratorResultCommandRepositoryGateway {
  public abstract createSpeechGeneratorResult(
    props: SpeechGeneratorResultEntity,
  ): TransactionType;

  public abstract updateSpeechGeneratorResult(
    id: SpeechGeneratorResultId,
    props: SpeechGeneratorResultEntity,
  ): TransactionType;
}

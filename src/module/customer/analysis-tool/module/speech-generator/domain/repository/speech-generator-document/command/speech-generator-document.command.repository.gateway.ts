import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import type { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';

export abstract class SpeechGeneratorDocumentCommandRepositoryGateway {
  public abstract createSpeechGeneratorDocument(
    props: SpeechGeneratorDocumentEntity,
  ): TransactionType;

  public abstract deleteSpeechGeneratorDocument(
    id: SpeechGeneratorDocumentId,
  ): TransactionType;
}

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';
import type { SpeechGeneratorBenefitId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/value-object/speech-generator-benefit-id/speech-generator-benefit-id.value-object';

export abstract class SpeechGeneratorBenefitCommandRepositoryGateway {
  public abstract createSpeechGeneratorBenefit(
    props: SpeechGeneratorBenefitEntity,
  ): TransactionType;

  public abstract deleteSpeechGeneratorBenefit(
    id: SpeechGeneratorBenefitId,
  ): TransactionType;
}

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';

export abstract class SpeechGeneratorCommandRepositoryGateway {
  public abstract createSpeechGenerator(
    props: SpeechGeneratorEntity,
  ): TransactionType;

  public abstract updateSpeechGenerator(
    id: SpeechGeneratorId,
    props: SpeechGeneratorEntity,
  ): TransactionType;

  public abstract deleteSpeechGenerator(
    id: SpeechGeneratorId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}

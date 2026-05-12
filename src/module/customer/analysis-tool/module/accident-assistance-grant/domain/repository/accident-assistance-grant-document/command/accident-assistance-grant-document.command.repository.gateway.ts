import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import type { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import type { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';

export abstract class AccidentAssistanceGrantDocumentCommandRepositoryGateway {
  public abstract createAccidentAssistanceGrantDocument(
    props: AccidentAssistanceGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteAllAccidentAssistanceGrantDocumentByAccidentAssistanceGrantId(
    id: AccidentAssistanceGrantId,
  ): TransactionType;

  public abstract deleteAccidentAssistanceGrantDocumentByAccidentAssistanceGrantIdAndType(
    id: AccidentAssistanceGrantId,
    type: AccidentAssistanceGrantDocumentTypeEnum,
  ): TransactionType;
}

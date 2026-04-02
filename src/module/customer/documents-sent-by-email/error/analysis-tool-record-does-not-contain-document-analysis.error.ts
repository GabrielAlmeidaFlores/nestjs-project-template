import { InvalidInputError } from '@core/error/invalid-input.error';

import type { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';

export class AnalysisToolRecordDoesNotContainDocumentAnalysisError extends InvalidInputError {
  protected override readonly _type =
    AnalysisToolRecordDoesNotContainDocumentAnalysisError.name;

  // eslint-disable-next-line pattern-rule/require-valid-error-constructor
  public constructor(args: {
    analysisToolRecordCode: AnalysisToolRecordCode;
    isSimplified: boolean;
  }) {
    super(
      `É necessário finalizar a análise da ${args.isSimplified ? 'versão simplificada' : 'versão padrão'} (${args.analysisToolRecordCode.toString()}) antes de enviar por e-mail.`,
    );
  }
}

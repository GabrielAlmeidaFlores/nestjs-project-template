import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidAnalysisToolRecordCodeError } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/error/invalid-analysis-tool-record-code.error';

export class LegalPleadingCode extends BaseValueObject<LegalPleadingCode> {
  protected readonly _type = LegalPleadingCode.name;

  public constructor(value: number | string) {
    let formattedCode: string;

    if (typeof value === 'number') {
      if (value < 1 || !Number.isInteger(value)) {
        throw new InvalidAnalysisToolRecordCodeError();
      }
      formattedCode = LegalPleadingCode.generate(value);
    } else {
      if (!LegalPleadingCode.isValidString(value)) {
        throw new InvalidAnalysisToolRecordCodeError();
      }
      formattedCode = value;
    }

    super(formattedCode);
  }

  private static generate(value: number): string {
    const padStart = 3;
    const numericPart = String(value).padStart(padStart, '0');
    return `AJ${numericPart}`;
  }

  private static isValidString(code: string): boolean {
    const formatRegex = /^A\d+$/;
    if (!formatRegex.test(code)) {
      return false;
    }

    const numericPart = code.substring(1);
    const numericValue = parseInt(numericPart, 10);

    return numericValue >= 1;
  }

  public equals(other: LegalPleadingCode): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

import type { CnisOutputModel } from '@lib/cnis-parser/model/output/cnis.output.model';

export abstract class CnisParserGateway {
  public abstract validateCnisDocument(pdf: Buffer): Promise<boolean>;
  public abstract parseCnisDocument(pdf: Buffer): Promise<CnisOutputModel>;
}

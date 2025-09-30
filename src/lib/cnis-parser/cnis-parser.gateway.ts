import type { CnisModel } from '@lib/cnis-parser/model/generic/cnis.model';

export abstract class CnisParserGateway {
  public abstract validateCnisDocument(pdf: Buffer): Promise<boolean>;
  public abstract parseCnisDocument(pdf: Buffer): Promise<CnisModel>;
}

import type { CnisOutputModel } from '@lib/cnis-handler/model/output/cnis.output.model';

export abstract class CnisHandlerGateway {
  public abstract validateCnisDocument(pdf: Buffer): Promise<boolean>;
  public abstract parseCnisDocument(pdf: Buffer): Promise<CnisOutputModel>;
}

import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

export abstract class CnisProcessorGateway {
  public abstract validateCnisDocument(pdf: Buffer): Promise<boolean>;
  public abstract parseCnisDocument(pdf: Buffer): Promise<CnisModel>;
}

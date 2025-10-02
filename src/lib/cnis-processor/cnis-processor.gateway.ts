import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class CnisProcessorGateway {
  public abstract validateCnisDocument(pdf: Buffer): Promise<boolean>;
  public abstract parseCnisDocument(pdf: Buffer): Promise<CnisOutputModel>;
}

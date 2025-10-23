import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type {
  CnisAffiliateIdentificationOutputModel,
  CnisSocialSecurityRelationOutputModel,
} from '@lib/cnis-processor/model/output/cnis.output.model';

export class CnisOutputCompleteModel extends BaseBuildableObject {
  public affiliateIdentification?: CnisAffiliateIdentificationOutputModel;
  public socialSecurityRelations?: Array<CnisSocialSecurityRelationOutputModel>;
  public idade: number;
  public potencialValido: string;
  public restritoValido: string;
  public duracaoTotalEmDias: number;
  public indicadoresDePendencia: object[];

  protected override readonly _type = CnisOutputCompleteModel.name;
}

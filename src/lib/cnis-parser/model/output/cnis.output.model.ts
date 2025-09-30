import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CnisSessionSocialSecurityAffiliationInfoOutputModel extends BaseBuildableObject {
  public seq?: number;
  public nit?: string;
  public codigoEmp?: string;
  public origemDoVinculo?: string;
  public matriculaDoTrabalhador?: string;
  public tipoFiliadoNoVinculo?: string;
  public dataFim?: Date;
  public dataInicio?: Date;
  public ultRemun?: Date;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationInfoOutputModel.name;
}

export class CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel extends BaseBuildableObject {
  public competencia?: Date;
  public remuneracao?: string;
  public indicadores?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel.name;
}

export class CnisSessionOutputModel extends BaseBuildableObject {
  public socialSecurityAffiliationInfo: CnisSessionSocialSecurityAffiliationInfoOutputModel;
  public socialSecurityAffiliationEarningsHistory: Array<CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel>;
  protected override readonly _type = CnisSessionOutputModel.name;
}

export class CnisOutputModel extends BaseBuildableObject {
  public data: Array<CnisSessionOutputModel>;

  protected override readonly _type = CnisOutputModel.name;
}

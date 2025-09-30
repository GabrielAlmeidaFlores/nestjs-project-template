import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CnisSessionSocialSecurityAffiliationInfoModel extends BaseBuildableObject {
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
    CnisSessionSocialSecurityAffiliationInfoModel.name;
}

export class CnisSessionSocialSecurityAffiliationEarningsHistoryModel extends BaseBuildableObject {
  public competencia?: Date;
  public remuneracao?: string;
  public indicadores?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationEarningsHistoryModel.name;
}

export class CnisSessionModel extends BaseBuildableObject {
  public socialSecurityAffiliationInfo: CnisSessionSocialSecurityAffiliationInfoModel;
  public socialSecurityAffiliationEarningsHistory: Array<CnisSessionSocialSecurityAffiliationEarningsHistoryModel>;
  protected override readonly _type = CnisSessionModel.name;
}

export class CnisModel extends BaseBuildableObject {
  public data: Array<CnisSessionModel>;

  protected override readonly _type = CnisModel.name;
}

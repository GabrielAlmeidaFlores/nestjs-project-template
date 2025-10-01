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
  public indicadores?: string;
  public nb?: string;
  public especie?: string;
  public situacao?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationInfoOutputModel.name;
}

export class CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel extends BaseBuildableObject {
  public competencia?: Date;
  public remuneracao?: string;
  public indicadores?: string;
  public dataPgto?: Date;
  public contribuicao?: string;
  public salarioContribuicao?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel.name;
}

export class CnisAffiliateIdentificationOutputModel extends BaseBuildableObject {
  public nit?: string;
  public dataDeNascimento?: Date;
  public cpf?: string;
  public nome?: string;
  public nomeDaMae?: string;

  protected override readonly _type =
    CnisAffiliateIdentificationOutputModel.name;
}

export class CnisSocialSecurityRelationOutputModel extends BaseBuildableObject {
  public socialSecurityAffiliationInfo: CnisSessionSocialSecurityAffiliationInfoOutputModel;
  public socialSecurityAffiliationEarningsHistory: Array<CnisSessionSocialSecurityAffiliationEarningsHistoryOutputModel>;

  protected override readonly _type =
    CnisSocialSecurityRelationOutputModel.name;
}

export class CnisOutputModel extends BaseBuildableObject {
  public affiliateIdentification?: CnisAffiliateIdentificationOutputModel;
  public socialSecurityRelations?: Array<CnisSocialSecurityRelationOutputModel>;

  protected override readonly _type = CnisOutputModel.name;
}

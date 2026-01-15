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
  public indicadores?: string;
  public nb?: string;
  public especie?: string;
  public situacao?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationInfoModel.name;
}

export class CnisSessionSocialSecurityAffiliationEarningsHistoryModel extends BaseBuildableObject {
  public competencia?: Date;
  public remuneracao?: string;
  public indicadores?: string;
  public dataPgto?: Date;
  public contribuicao?: string;
  public salarioContribuicao?: string;
  public contrato?: string;
  public establecimento?: string;
  public tomador?: string;
  public formaPrestacaoServico?: string;

  protected override readonly _type =
    CnisSessionSocialSecurityAffiliationEarningsHistoryModel.name;
}

export class CnisAffiliateIdentificationModel extends BaseBuildableObject {
  public nit?: string;
  public dataDeNascimento?: Date;
  public cpf?: string;
  public nome?: string;
  public nomeDaMae?: string;

  protected override readonly _type = CnisAffiliateIdentificationModel.name;
}

export class CnisSocialSecurityRelationModel extends BaseBuildableObject {
  public socialSecurityAffiliationInfo: CnisSessionSocialSecurityAffiliationInfoModel;
  public socialSecurityAffiliationEarningsHistory: Array<CnisSessionSocialSecurityAffiliationEarningsHistoryModel>;

  protected override readonly _type = CnisSocialSecurityRelationModel.name;
}

export class CnisModel extends BaseBuildableObject {
  public affiliateIdentification?: CnisAffiliateIdentificationModel;
  public socialSecurityRelations?: Array<CnisSocialSecurityRelationModel>;

  protected override readonly _type = CnisModel.name;
}

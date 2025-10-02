export interface RawCnisSessionSocialSecurityAffiliationInfoInterface {
  [x: string]: string;
}

export interface RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface {
  [x: string]: string;
}

export interface RawCnisSessionAffiliateIdentificationInterface {
  [x: string]: string;
}

export interface RawCnisSocialSecurityRelationInterface {
  socialSecurityAffiliationInfo: RawCnisSessionSocialSecurityAffiliationInfoInterface;
  socialSecurityAffiliationEarningsHistory: Array<RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface>;
}

export interface RawCnisInterface {
  affiliateIdentification?: RawCnisSessionAffiliateIdentificationInterface;
  socialSecurityRelations?: Array<RawCnisSocialSecurityRelationInterface>;
}

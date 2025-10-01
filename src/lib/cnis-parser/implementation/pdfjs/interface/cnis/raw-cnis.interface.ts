export interface RawCnisSessionSocialSecurityAffiliationInfoInterface {
  [x: string]: string;
}

export interface RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface {
  [x: string]: string;
}

export interface RawCnisSessionInterface {
  socialSecurityAffiliationInfo: RawCnisSessionSocialSecurityAffiliationInfoInterface;
  socialSecurityAffiliationEarningsHistory: Array<RawCnisSessionSocialSecurityAffiliationEarningsHistoryInterface>;
}

export interface TermsAgreement {
  all: boolean;
  agreement1: boolean;
  agreement2: boolean;
  agreement3: boolean;
  agreement4: boolean;
  agreement5: boolean;
}

export type AgreementKeys = Exclude<keyof TermsAgreement, 'all'>;

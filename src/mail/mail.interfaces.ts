export interface MailModuleInterface {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

export interface EmailVars {
  [key: string]: string;
}

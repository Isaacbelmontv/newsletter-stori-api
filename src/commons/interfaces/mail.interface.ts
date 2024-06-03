export interface IEmailData {
  from: string;
  to: string;
  subject: string;
  text: string;
  assets?: Buffer;
  attachments?: any;
}

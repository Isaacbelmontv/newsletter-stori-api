export interface INewsletter {
  id: number;
  title: string;
  content: string;
  assetfile?: Buffer;
  assetname?: string;
  assettype?: string;
}

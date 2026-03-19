export abstract class MarkdownConverterGateway {
  protected readonly _type = MarkdownConverterGateway.name;

  public abstract convertToHtml(text: string): Promise<string>;
}

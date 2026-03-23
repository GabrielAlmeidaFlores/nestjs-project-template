export abstract class SystemLogCommandGateway {
  protected readonly _type = SystemLogCommandGateway.name;

  public abstract persist(props: {
    code: number;
    endpoint: string;
    stackTrace: string | null;
    isError: boolean;
    requestBody: string | null;
    responseBody: string | null;
  }): Promise<void>;
}

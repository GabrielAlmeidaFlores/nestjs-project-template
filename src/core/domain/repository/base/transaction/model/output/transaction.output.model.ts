export class TransactionOutputModel {
  protected readonly _type = TransactionOutputModel.name;

  public constructor(
    public readonly commit: () => Promise<void>,
    public readonly rollback: () => Promise<void>,
  ) {}
}

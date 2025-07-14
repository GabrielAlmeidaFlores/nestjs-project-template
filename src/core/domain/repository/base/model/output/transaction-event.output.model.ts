export class TransactionEventOutputModel {
  protected readonly _type = TransactionEventOutputModel.name;

  public constructor(
    public readonly commit: () => Promise<void>,
    public readonly rollback: () => Promise<void>,
  ) {}
}

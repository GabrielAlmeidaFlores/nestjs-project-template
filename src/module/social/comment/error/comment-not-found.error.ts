import { NotFoundError } from '@core/error/not-found.error';

export class CommentNotFoundError extends NotFoundError {
  protected override readonly _type = CommentNotFoundError.name;

  public constructor() {
    super('Comment not found.');
  }
}

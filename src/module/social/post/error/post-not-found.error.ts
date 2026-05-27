import { NotFoundError } from '@core/error/not-found.error';

export class PostNotFoundError extends NotFoundError {
  protected override readonly _type = PostNotFoundError.name;

  public constructor() {
    super('Post not found.');
  }
}

import { Exclude } from 'class-transformer';

export function ResponseDto(): ClassDecorator {
  return (target: Function) => {
    Exclude()(target.prototype);
  };
}

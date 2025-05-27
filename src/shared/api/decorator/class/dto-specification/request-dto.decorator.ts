import { Exclude } from 'class-transformer';

export function RequestDto(): ClassDecorator {
  return (target: Function) => {
    Exclude()(target.prototype);
  };
}

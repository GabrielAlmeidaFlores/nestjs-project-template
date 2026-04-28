import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentAssistanceTerminatedCidId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/value-object/accident-assistance-terminated-cid-id/accident-assistance-terminated-cid-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AccidentAssistanceTerminatedCidEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/accident-assistance-terminated-cid.entity.props.interface';

export class AccidentAssistanceTerminatedCidEntity extends BaseEntity<AccidentAssistanceTerminatedCidId> {
  @Description('Nome do CID associado ao evento gerador.')
  public readonly name: string;

  protected readonly _type = AccidentAssistanceTerminatedCidEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedCidEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedCidId, props);

    this.name = props.name;
  }
}

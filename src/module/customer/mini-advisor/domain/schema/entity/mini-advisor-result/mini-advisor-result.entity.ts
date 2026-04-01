import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntityPropsInterface } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity.props.interface';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

export class MiniAdvisorResultEntity extends BaseEntity<MiniAdvisorResultId> {
  public readonly miniAdvisorId: MiniAdvisorId;
  public readonly chosenAnalysis: MiniAdvisorAnalysisTypeEnum;
  public readonly benefitDescription: string | null;
  public readonly attentionNote: string | null;

  protected readonly _type = MiniAdvisorResultEntity.name;

  public constructor(props: MiniAdvisorResultEntityPropsInterface) {
    super(MiniAdvisorResultId, props);
    this.miniAdvisorId = props.miniAdvisorId;
    this.chosenAnalysis = props.chosenAnalysis;
    this.benefitDescription = props.benefitDescription ?? null;
    this.attentionNote = props.attentionNote ?? null;
  }
}

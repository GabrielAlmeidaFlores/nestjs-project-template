import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsTerminatedRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, {
    required: false,
    description:
      'Identificador do cliente previamente cadastrado na ferramenta de análise. Os campos da tela "Nome do cliente", "CPF do cliente", "Data de nascimento" e "Sexo" são resolvidos a partir deste cadastro.',
  })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({
    required: false,
    description: 'Nome da análise.',
  })
  public analysisName?: string;

  @RequestDtoDateProperty({
    required: false,
    description: 'Data de Entrada do Requerimento (DER).',
  })
  public requestEntryDate?: Date;

  @RequestDtoDateProperty({
    required: false,
    description:
      'Data da cessação ou suspensão do benefício. Na tela pode aparecer como data da decisão/indeferimento, conforme o fluxo.',
  })
  public benefitCessationDate?: Date;

  @RequestDtoEnumProperty(TemporaryDisabilityBenefitsTerminatedCategoryEnum, {
    required: false,
    description: 'Categoria selecionada para a análise.',
  })
  public category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum;

  @RequestDtoStringProperty({
    required: false,
    description: 'Senha do Meu INSS informada para a análise.',
  })
  public myInssPassword?: string;

  @RequestDtoStringProperty({
    required: false,
    description:
      'Descrição livre do motivo da cessação ou suspensão do benefício.',
  })
  public benefitCessationReason?: string;

  @RequestDtoStringProperty({
    required: false,
    isArray: true,
    description: 'Números de benefício do INSS (NB) associados à análise.',
  })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedRequestDto.name;
}

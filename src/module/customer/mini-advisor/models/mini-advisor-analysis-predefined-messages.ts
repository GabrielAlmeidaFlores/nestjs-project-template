import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';

export interface MiniAdvisorAnalysisPredefinedMessageInterface {
  benefitDescription: string;
  attentionNote: string;
}

export const miniAdvisorAnalysisPredefinedMessages: Record<
  MiniAdvisorAnalysisTypeEnum,
  MiniAdvisorAnalysisPredefinedMessageInterface
> = {
  [MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT]: {
    benefitDescription:
      'Análise de aposentadoria urbana pelas regras gerais e de transição da EC 103/2019. Avalia todas as modalidades disponíveis, incluindo aposentadoria programada, regras de transição por pontos, por idade progressiva e por tempo de contribuição com direito adquirido.',
    attentionNote:
      'Verifique se o cliente possui direito adquirido antes da EC 103/2019, o que pode resultar em benefícios mais vantajosos. Recomenda-se a análise comparativa entre todas as regras disponíveis para identificar a mais favorável.',
  },
  [MiniAdvisorAnalysisTypeEnum.DISABILITY_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Planejamento previdenciário para pessoa com deficiência, com requisitos de tempo de contribuição reduzidos conforme o grau: grave (20 anos homem / 15 anos mulher), moderado (29/24) e leve (34/29). Exige avaliação biopsicossocial pelo INSS.',
    attentionNote:
      'A comprovação do grau de deficiência deve ser formalizada por laudo médico e avaliação biopsicossocial. Reúna toda a documentação médica disponível para embasar a qualificação junto ao INSS e verifique se há deficiência preexistente à filiação.',
  },
  [MiniAdvisorAnalysisTypeEnum.TEACHER_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Aposentadoria especial do professor com redução de 5 anos no tempo de contribuição (25 anos para mulheres e 30 anos para homens), exclusivamente para quem exerce função de magistério em educação básica (educação infantil, ensino fundamental ou ensino médio).',
    attentionNote:
      'É essencial comprovar o efetivo exercício de função de magistério, não apenas o vínculo com a instituição de ensino. Diretores, coordenadores e orientadores pedagógicos em geral não têm direito à aposentadoria do professor, salvo se também exercerem docência.',
  },
  [MiniAdvisorAnalysisTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS]: {
    benefitDescription:
      'Aposentadoria especial do professor no Regime Próprio de Previdência Social (RPPS), com redução de 5 anos no tempo de contribuição (25 anos para mulheres e 30 anos para homens), exclusivamente para servidores públicos que exercem função de magistério em educação infantil, ensino fundamental ou ensino médio.',
    attentionNote:
      'É essencial comprovar o efetivo exercício de função de magistério no serviço público, não apenas o vínculo com a instituição de ensino. Verifique as regras específicas do ente federativo ao qual o servidor está vinculado, pois cada RPPS pode ter particularidades. Considere as regras de transição aplicáveis ao regime próprio.',
  },
  [MiniAdvisorAnalysisTypeEnum.SPECIAL_CATEGORY_RETIREMENT]: {
    benefitDescription:
      'Aposentadoria especial para trabalhadores expostos de forma habitual e permanente a agentes nocivos à saúde (ruído, produtos químicos, calor, agentes biológicos, entre outros). Exige 15, 20 ou 25 anos de atividade especial conforme o agente e o período laborado.',
    attentionNote:
      'A comprovação da atividade especial requer o Perfil Profissiográfico Previdenciário (PPP) emitido pela empresa. Períodos anteriores a abril de 1995 podem ser enquadrados por categoria profissional. A utilização de EPI eficaz pode comprometer o reconhecimento do período especial.',
  },
  [MiniAdvisorAnalysisTypeEnum.RURAL_OR_HYBRID_RETIREMENT]: {
    benefitDescription:
      'Aposentadoria por idade rural para segurado especial (trabalhador em regime de economia familiar) com redução de 5 anos na idade mínima, ou aposentadoria por idade híbrida, que soma períodos rurais e urbanos para fins de carência.',
    attentionNote:
      'A comprovação do tempo rural exige início de prova material contemporânea ao período declarado. A presença de vínculos urbanos durante o período rural pode descaracterizar a condição de segurado especial, devendo ser analisada com atenção.',
  },
  [MiniAdvisorAnalysisTypeEnum.PERMANENT_DISABILITY_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Aposentadoria por incapacidade permanente para segurados que, após cumprida a carência de 12 meses, tornaram-se definitivamente incapazes para qualquer atividade laborativa. Não exige carência em casos de acidente ou doenças graves previstas no art. 151 da Lei 8.213/91.',
    attentionNote:
      'A incapacidade deve ser total e permanente, excluindo a possibilidade de reabilitação profissional. O laudo médico deve ser robusto e corroborado por exames de imagem e pareceres de especialistas. Verifique a qualidade de segurado na data de início da incapacidade.',
  },
  [MiniAdvisorAnalysisTypeEnum.TEMPORARY_DISABILITY_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Auxílio por incapacidade temporária para segurados temporariamente incapacitados para o trabalho por mais de 15 dias consecutivos. Exige carência de 12 meses, dispensada em casos de acidente ou doenças previstas no art. 151 da Lei 8.213/91.',
    attentionNote:
      'A qualidade de segurado na data de início da incapacidade (DII) é fundamental. Em caso de desemprego, o período de graça pode ser estendido. Reúna toda a documentação médica disponível para comprovar a data de início e a duração da incapacidade.',
  },
  [MiniAdvisorAnalysisTypeEnum.ACCIDENT_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Auxílio-acidente, benefício permanente de natureza indenizatória, concedido ao segurado que sofreu acidente de qualquer natureza e ficou com sequelas definitivas que reduzem a capacidade para o trabalho habitual. Não exige carência e pode ser acumulado com a remuneração do trabalho.',
    attentionNote:
      'As sequelas devem ser definitivas e comprovadas após a consolidação das lesões. O laudo pericial deve descrever especificamente a redução da capacidade para o trabalho habitual. O benefício difere do auxílio por incapacidade temporária, que é transitório e cessa com a recuperação.',
  },
  [MiniAdvisorAnalysisTypeEnum.DEATH_PENSION_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Pensão por morte para dependentes do segurado falecido (cônjuge, companheiro, filhos e demais dependentes previstos em lei). Exige que o falecido possuísse qualidade de segurado ou já estivesse aposentado na data do óbito e que os dependentes comprovem a relação de dependência.',
    attentionNote:
      'Atenção especial à qualidade de segurado do falecido na data do óbito. Para cônjuge ou companheiro, verifique o tempo de convivência e a dependência econômica nos casos de casamento ou união estável recente. Dependentes inválidos podem ter direito a pensão vitalícia independentemente da duração do vínculo.',
  },
  [MiniAdvisorAnalysisTypeEnum.MATERNITY_PAY_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Salário-maternidade para seguradas que deram à luz, adotaram ou obtiveram guarda judicial de criança para fins de adoção. A duração é de 120 dias. Exige carência variável conforme a categoria da segurada (sem carência para empregada; 10 contribuições para contribuinte individual e facultativa).',
    attentionNote:
      'Verifique a qualidade de segurada na data do parto ou da adoção. O salário-maternidade pode ser pleiteado mesmo após o término do vínculo empregatício, desde que dentro do período de graça. A demissão antes do parto em regra não impede o recebimento do benefício.',
  },
  [MiniAdvisorAnalysisTypeEnum.ELDERLY_BPC_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Benefício de Prestação Continuada (BPC) para idosos com 65 anos ou mais em situação de vulnerabilidade econômica, independentemente de contribuição ao INSS. Trata-se de benefício assistencial não contributivo no valor de 1 salário mínimo.',
    attentionNote:
      'O benefício exige comprovação de hipossuficiência econômica. A renda per capita familiar deve ser inferior a 1/4 do salário mínimo, embora os tribunais admitam critérios mais flexíveis mediante comprovação da situação de vulnerabilidade. Não é possível acumular com outro benefício assistencial.',
  },
  [MiniAdvisorAnalysisTypeEnum.DISABILITY_BPC_RETIREMENT_PLANNING]: {
    benefitDescription:
      'Benefício de Prestação Continuada (BPC) para pessoas com deficiência de qualquer idade com impedimento de longo prazo (mínimo 2 anos) de natureza física, mental, intelectual ou sensorial, em situação de vulnerabilidade econômica. Não exige contribuição ao INSS. Valor de 1 salário mínimo.',
    attentionNote:
      'A avaliação do impacto da deficiência é realizada por equipe multiprofissional do INSS. A renda per capita familiar deve ser inferior a 1/4 do salário mínimo, mas os tribunais têm ampliado esse critério em casos de comprovada vulnerabilidade. Não é possível acumular com outro benefício assistencial.',
  },
};

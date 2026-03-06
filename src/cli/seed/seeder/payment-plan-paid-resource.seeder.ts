import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const PAYMENT_PLAN_PAID_RESOURCE_SEED: Array<PaymentPlanPaidResourceEntity> =
  [
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('36c342c8-6623-4e89-85e1-a5ea88d94cbb'),
      resource:
        PaymentPlanPaidResourceTypeEnum.CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE RÁPIDA CNIS - ANÁLISE COMPLETA',
      description:
        'Análise detalhada do CNIS com IA, gerando parecer completo sobre vínculos, contribuições, qualidade de segurado e carência. Identifica períodos com e sem recolhimento, calcula tempo de contribuição e aponta inconsistências.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ff0a1c66-9009-4402-97f8-2b54f5967f28'),
      resource:
        PaymentPlanPaidResourceTypeEnum.CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE RÁPIDA CNIS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise rápida do CNIS com IA, gerando parecer objetivo sobre vínculos ativos, tempo de contribuição total e situação atual da qualidade de segurado. Versão resumida ideal para verificações iniciais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('3f8c7e3e-4ee7-400a-a7a5-07114fca359d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'PEÇAS JURÍDICAS - ANÁLISE COMPLETA',
      description:
        'Análise completa de petições iniciais, contestações, recursos e outras peças processuais com IA. Gera parecer detalhado sobre argumentação, fundamentação legal, pontos fortes e fracos, e sugestões de melhoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d576bf-323b-4f3f-aec4-dce4e2c90988'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'PEÇAS JURÍDICAS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de peças processuais com IA, gerando parecer objetivo sobre adequação da argumentação, presença dos requisitos essenciais e principais pontos de atenção. Versão resumida para revisões rápidas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6caaef15-be5f-4f93-84c8-ed8d0c6c283b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
      creditCost: 3,
      title: 'PEÇAS JURÍDICAS - ANÁLISE RÁPIDA DE DOCUMENTOS',
      description:
        'Análise expressa de documentos previdenciários (CNIS, CTPS, PPP, CTC) para suportar peças jurídicas. Extrai informações essenciais, identifica períodos relevantes e valida autenticidade documental com IA.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b957684d-1cc4-4cbe-8233-04a22b4bb676'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'PLANEJAMENTO DE APOSENTADORIA RPPS - ANÁLISE COMPLETA',
      description:
        'Planejamento completo de aposentadoria no Regime Próprio de Previdência Social (RPPS) com IA. Calcula tempo de contribuição, simula regras de transição, estima valores de benefício e identifica melhor momento para aposentação de servidor público.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c32c6734-bb4a-405f-8c84-5199848b1dcb'),
      resource: PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
      creditCost: 0,
      title: 'MONITORAMENTO DE PROCESSOS JURÍDICOS',
      description:
        'Acompanhamento automático e contínuo de processos jurídicos nos tribunais. Sistema monitora movimentações processuais em tempo real, emite notificações sobre atualizações importantes, mantém histórico completo de andamentos e alertas de prazos críticos.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('bd9b379c-0e54-4ede-a3da-476185e69f8e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS,
      creditCost: 0.3,
      title: 'CHAT ELOY - QUESTÕES PREVIDENCIÁRIAS',
      description:
        'Assistente de IA especializado em responder dúvidas sobre direito previdenciário. Esclarece questões sobre benefícios do INSS, requisitos para aposentadoria, pensão e auxílios, documentação necessária, prazos processuais e procedimentos administrativos, fornecendo fundamentação legal completa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('056fa86a-6a7e-49fc-941a-477ec9a28f56'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_LEGISLATION_QUESTIONS,
      creditCost: 0.3,
      title: 'CHAT ELOY - CONSULTA DE LEGISLAÇÃO PREVIDENCIÁRIA',
      description:
        'Assistente de IA especializado em legislação previdenciária. Consulta e interpreta leis, decretos, instruções normativas do INSS, portarias, medidas provisórias e regulamentos do RGPS e RPPS, fornecendo citações precisas com número da norma, artigo e interpretação contextualizada aplicada ao caso concreto.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('98ce2c1e-52f3-4dbd-a2f9-9a7972db4c17'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH,
      creditCost: 0.3,
      title: 'CHAT ELOY - PESQUISA DE TESES JURÍDICAS VITORIOSAS',
      description:
        'Assistente de IA para pesquisa de teses jurídicas vitoriosas em direito previdenciário. Identifica precedentes favoráveis em tribunais superiores (STF, STJ, TNU), súmulas vinculantes e não vinculantes, recursos repetitivos com repercussão geral, jurisprudência consolidada e decisões recentes, fornecendo estratégias argumentativas baseadas em casos vencedores.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d146fdb8-8511-472e-9f0c-dc9d5fb0d2ad'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_ANALYSIS,
      creditCost: 0.3,
      title: 'CHAT ELOY - ANÁLISE INTELIGENTE DE DOCUMENTOS E CASOS',
      description:
        'Assistente de IA para análise inteligente de documentos e casos previdenciários. Examina CNIS, CTPS, PPP, laudos médicos, processos administrativos do INSS, ações judiciais e recursos, identificando informações relevantes, inconsistências documentais, pontos fortes e fracos do caso, fornecendo insights estratégicos e sugestões de argumentação jurídica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a3f5c2e1-8d4b-4c9a-9f61-1e8c7b6a5d42'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS,
      creditCost: 5,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DO CNIS',
      description:
        'Análise do CNIS com IA para planejamento de aposentadoria no RGPS. Calcula tempo de contribuição, identifica períodos com e sem recolhimento, verifica carência e qualidade de segurado, gerando projeções de elegibilidade para diferentes modalidades de aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('9b1e7d4a-2f63-4a0d-8c55-6e3b2a1f9c87'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS,
      creditCost: 4,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - COMPARAÇÃO CNIS E CTPS',
      description:
        'Comparação inteligente entre vínculos do CNIS e anotações da CTPS com IA. Identifica períodos divergentes, vínculos omissos no CNIS, inconsistências de datas e dados, gerando relatório de períodos que podem ser reconhecidos judicialmente ou administrativamente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4d8c1a7e-5b2f-4f6c-9a03-e71b6d5c2f98'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS,
      creditCost: 6,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE PERÍODOS ESPECIAIS PPP',
      description:
        'Análise de períodos de trabalho especial com base no PPP (Perfil Profissiográfico Previdenciário) usando IA. Identifica exposição a agentes nocivos, valida enquadramento legal por período histórico, calcula conversão de tempo especial em comum e impacto na aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e2c9b7a4-6f1d-4e8a-9b55-0c3d2f8a71e6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
      creditCost: 5,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE DOCUMENTOS SEM DATA FIM',
      description:
        'Análise de vínculos empregatícios e atividades sem data de término usando IA. Examina contratos de trabalho vigentes, atividades autônomas em andamento, vínculos não baixados no CNIS, calculando projeções de tempo futuro e elegibilidade progressiva para aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6a5f8c2e-1d4b-4c9e-8a73-f2b1e0d97c34'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário. Examina documentos comprobatórios (declarações sindicais, notas fiscais, contratos de arrendamento, ITR), valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c1d7e5b9-8a2f-4f3c-9e04-6a5b2d1c87f4'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário. Valida certificados de reservista, calcula período computável, verifica sobreposição com vínculos civis, orienta sobre procedimento de averbação e impacto no tempo total de contribuição.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('8f6a9e2b-5c1d-4a7f-9b34-e2d1c0a578f6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público (municipal, estadual, federal) com IA para averbação no RGPS. Examina Certidões de Tempo de Contribuição (CTC), valida períodos computáveis, identifica possíveis recusas de averbação e orienta sobre contestação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('2c5a8e7d-9b1f-4d63-ae04-6f3c1b0a97d8'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS usando IA. Identifica períodos omissos, valida autenticidade das anotações, avalia viabilidade de reconhecimento administrativo ou necessidade de ação judicial, calculando ganho de tempo e impacto na aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7e1a2c9-4b6d-4f85-9a03-8c5d2b1e67a4'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz (Menor Aprendiz Lei 10.097/2000) com IA para reconhecimento previdenciário. Valida contratos de aprendizagem, verifica recolhimentos ao INSS, calcula período computável conforme legislação vigente à época e impacto no tempo de contribuição.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5d8e2c1a-7f4b-4a96-9c03-e6b5f0d1a782'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS. Examina acordos internacionais de previdência social, valida documentação estrangeira, orienta sobre apostilamento e tradução juramentada, calcula tempo computável e procedimentos de averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('3c8e5a1d-7b2f-4a96-9e04-d1b6f0c52a78'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal (autônomo, contribuinte individual) com IA. Examina recibos de pagamento autônomo (RPA), notas fiscais de serviço, carnês de contribuição, valida recolhimentos em atraso, calcula viabilidade de indenização e impacto no tempo de contribuição e valor do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b6a1f9d3-2e7c-4c58-8a04-5e1d0f7b9c62'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE DECISÕES DA JUSTIÇA DO TRABALHO',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento de vínculo previdenciário. Examina decisões judiciais transitadas em julgado, valida reconhecimento de vínculo empregatício, calcula período e salários de contribuição homologados, orienta procedimento de averbação no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('8d2f7e1a-5c4b-4f93-9a60-b1e6c3d05897'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS,
      creditCost: 5,
      title: 'PLANEJAMENTO DE APOSENTADORIA RGPS - ANÁLISE DE REGRAS FINAIS',
      description:
        'Análise comparativa final de todas as regras de aposentadoria disponíveis no RGPS usando IA. Simula aposentadoria por idade, tempo de contribuição, regras de transição (pedágio 50%, 100%, pontos, idade mínima), calcula valores estimados, identifica regra mais vantajosa e melhor momento para requerer.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c9db74d2-2b6f-4b32-9c7f-2f3a7b1e8c50'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INSURANCE_QUALITY_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'QUALIDADE DE SEGURADO E CARÊNCIA - ANÁLISE COMPLETA',
      description:
        'Análise completa da qualidade de segurado e carência com IA. Verifica manutenção da qualidade de segurado, calcula período de graça, conta carências por tipo de benefício (aposentadoria, auxílio-doença, salário-maternidade), identifica lacunas contributivas e risco de perda de qualidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a0f3c5e4-9d2a-4a1a-8c2f-7b6d5e3a4c12'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'QUALIDADE DE SEGURADO E CARÊNCIA - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da qualidade de segurado com IA. Verifica situação atual (segurado ativo ou em período de graça), informa carência total de contribuições, alerta sobre proximidade de perda da qualidade de segurado. Versão resumida para verificações rápidas.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('87c9db53-a1bb-46da-8fe4-a97bb2b7b703'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'PROCEDIMENTO ADMINISTRATIVO DO INSS - ANÁLISE COMPLETA',
      description:
        'Análise completa de processos administrativos no INSS com IA. Examina pedidos de benefício, recursos ao INSS, exigências documentais, pareceres médicos e sociais, indeferimentos, gerando relatório detalhado sobre andamento, prazos, irregularidades e estratégia de contestação ou complementação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('87c9db53-a1bb-46da-8fe2-a94bb2b7b703'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'PROCEDIMENTO ADMINISTRATIVO DO INSS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de processos administrativos no INSS com IA. Identifica status atual do pedido, prazo decorrido, principais pendências ou motivos de indeferimento, próximos passos recomendados. Versão resumida para acompanhamento objetivo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'CASO JUDICIAL - ANÁLISE COMPLETA',
      description:
        'Análise completa de processos judiciais previdenciários com IA. Examina petição inicial, contestação, provas, laudos periciais, sentenças e acórdãos, identificando fundamentos jurídicos utilizados, teses defensivas, chances de êxito, pontos frágeis e estratégias processuais recomendadas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f94f5d7f-d7fb-4b92-a00c-f84f6329c132'),
      resource:
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'CASO JUDICIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de processos judiciais previdenciários com IA. Identifica pedido principal, fundamentos jurídicos básicos, fase processual atual, argumentos da defesa e estimativa resumida de chances de êxito. Versão objetiva para visão geral rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e9bfa47e-d159-4b54-8ef4-05dfc6c655d2'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'GERADOR DE PERGUNTAS MÉDICAS - ANÁLISE COMPLETA',
      description:
        'Geração completa de perguntas médicas estratégicas com IA para laudos e perícias. Analisa patologias alegadas, CID relacionados, documentos médicos apresentados, gerando questionário técnico para médico assistente ou perito, visando comprovar incapacidade laborativa ou condições de saúde.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d5c8e1f2-a3b4-4c5d-8e6f-7a8b9c0d1e2f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PERGUNTAS MÉDICAS - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de perguntas médicas essenciais com IA. Cria questionário objetivo baseado na patologia principal alegada, focando em perguntas diretas sobre sintomas, limitações funcionais e capacidade laborativa. Versão resumida para casos menos complexos.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7c4e9b2f-8a1d-4c5e-9b3a-6f2d8e1c5a7b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_COMPLETE_ANALYSIS,
      creditCost: 3,
      title: 'ATIVIDADE ESPECIAL - ANÁLISE COMPLETA',
      description:
        'Análise completa de períodos de atividade especial com IA. Examina PPP, LTCAT, laudos técnicos, identifica agentes nocivos (químicos, físicos, biológicos), valida enquadramento legal por período histórico (decretos 53.831/64, 83.080/79, Lei 9.032/95), calcula conversão de tempo especial e impacto total na aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5a8f3d1c-6e2b-4d9a-8c4e-7b1f9a3d6c2e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_ACTIVITY_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'ATIVIDADE ESPECIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de atividade especial com IA. Identifica principais agentes nocivos expostos, valida se há enquadramento legal básico, calcula tempo especial total reconhecível e ganho estimado com conversão. Versão resumida para avaliação inicial de viabilidade.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('0a308887-2dc9-4194-a9dd-b2b94c3ab820'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title:
        'GERADOR DE IMPUGNAÇÃO A LAUDOS MÉDICOS E SOCIAIS - ANÁLISE COMPLETA',
      description:
        'Geração completa de impugnação a laudos periciais (médicos e sociais) do INSS com IA. Analisa laudo contestado, identifica inconsistências técnicas, contradições com documentação médica apresentada, gera argumentação jurídica fundamentada e quesitos técnicos para novo exame pericial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('79b3f020-6f89-4ebb-8558-f3bc3090b70e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title:
        'GERADOR DE IMPUGNAÇÃO A LAUDOS MÉDICOS E SOCIAIS - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de impugnação a laudos periciais com IA. Identifica principais pontos de discordância entre laudo e documentação médica, gera argumentação objetiva e quesitos essenciais. Versão resumida para contestações de menor complexidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ac86628d-5082-4fea-ab1f-4e5086dd9ecf'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE DISCURSO - ANÁLISE COMPLETA',
      description:
        'Geração completa de discurso/razões finais em formato editável (markup/hypertext) com IA. Analisa todo o conjunto probatório, documentos previdenciários, perícias, jurisprudência aplicável, gerando texto argumentativo estruturado com fundamentação jurídica e técnica detalhada pronta para personalização.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('22f73a10-71d6-4adf-ae00-914183a5381d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE DISCURSO - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de discurso em formato editável (markup/hypertext) com IA. Cria texto argumentativo objetivo baseado nos principais documentos e fundamentos jurídicos, com estrutura básica de razões finais. Versão resumida para casos menos complexos ou argumentações sintéticas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a7b8c9d0-e1f2-4a3b-8c5d-6e7f8a9b0c1d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'AVALIAÇÃO DE DEFICIÊNCIA PARA BPC - ANÁLISE COMPLETA',
      description:
        'Análise completa da deficiência para Benefício de Prestação Continuada (BPC/LOAS) com IA. Examina laudos médicos, CIF (Classificação Internacional de Funcionalidade), avalia impedimentos de longo prazo, barreiras sociais e participação plena na sociedade, gerando parecer fundamentado sobre enquadramento legal da deficiência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b8c9d0e1-f2a3-4b4c-9d5e-7f8a9b0c1d2e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'AVALIAÇÃO DE DEFICIÊNCIA PARA BPC - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da deficiência para BPC/LOAS com IA. Verifica presença de impedimentos de longo prazo documentados, avalia de forma objetiva se há indícios de deficiência elegível ao BPC conforme conceito legal. Versão resumida para triagem inicial de viabilidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5798a2ae-9656-4b82-acdf-cc68cc4b8659'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'LINHA DO TEMPO RURAL - ANÁLISE COMPLETA',
      description:
        'Análise completa da linha do tempo rural com IA, examinando todos os períodos de atividade rural cadastrados, documentos comprobatórios de cada período e contribuições CNIS relacionadas. Gera parecer técnico consolidado sobre viabilidade de reconhecimento, suficiência probatória, lacunas documentais e orientações estratégicas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 1,
      title:
        'LINHA DO TEMPO RURAL - ANÁLISE DE DOCUMENTO INDIVIDUAL DE PERÍODO',
      description:
        'Análise individual de um único documento comprobatório de atividade rural com IA. Valida autenticidade formal, identifica período coberto, examina conteúdo probatório (declaração sindical, nota fiscal, contrato, ITR), avalia força probatória isolada e necessidade de documentos complementares para aquele período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('784afb91-db0b-40b3-9af4-6f453c70d6de'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 3,
      title:
        'LINHA DO TEMPO RURAL - ANÁLISE CONSOLIDADA DE DOCUMENTOS DO PERÍODO',
      description:
        'Análise consolidada de todos os documentos comprobatórios de um único período de atividade rural específico com IA. Examina conjunto probatório daquele período, valida consistência temporal entre documentos, avalia suficiência do início de prova material e robustez probatória para reconhecimento judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f3e7d2a8-9b4c-4f6e-8a1d-5c2b7e9a3f1d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTIONS_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'GERADOR DE PERGUNTAS PARA AUDIÊNCIA - ANÁLISE COMPLETA',
      description:
        'Geração completa de perguntas estratégicas para audiências judiciais e administrativas com IA. Analisa petição inicial, documentos, provas, contestação e pontos controvertidos, criando questionário detalhado para oitiva de testemunhas, interrogatório de parte adversa e esclarecimentos periciais, visando fortalecer tese ou desqualificar argumentos contrários.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a8c6e1f9-2d4b-4e7a-9c3d-6f1b8a5e2c7d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.AUDIENCE_QUESTIONS_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PERGUNTAS PARA AUDIÊNCIA - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de perguntas essenciais para audiências com IA. Cria questionário objetivo focado nos pontos principais da controvérsia, com perguntas diretas para testemunhas confirmarem fatos essenciais à causa. Versão resumida para preparação rápida de clientes e estratégia básica de oitiva.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b0f0af5b-d7d5-4e9d-81ae-2dab050e2483'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_CONSOLIDATED_DOCUMENT_ANALYSIS,
      creditCost: 5,
      title:
        'LINHA DO TEMPO RURAL - ANÁLISE CONSOLIDADA GERAL DE TODOS OS DOCUMENTOS',
      description:
        'Análise consolidada geral de todos os documentos comprobatórios de todos os períodos da linha do tempo rural com IA. Examina conjunto probatório completo considerando múltiplos períodos rurais, identifica sobreposições, lacunas temporais, consistência entre períodos distintos, gerando parecer técnico unificado sobre viabilidade global de reconhecimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d7e8f9a0-b1c2-4d3e-9f0a-4b5c6d7e8f9a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'RENDA PER CAPITA PARA BPC - ANÁLISE COMPLETA',
      description:
        'Análise completa da renda per capita familiar para elegibilidade ao BPC/LOAS com IA. Examina composição do grupo familiar, rendas de todos os membros, benefícios recebidos, despesas dedutíveis (medicamentos de uso contínuo), calcula renda per capita conforme legislação vigente e jurisprudência favorável, identifica possibilidades de enquadramento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'RENDA PER CAPITA PARA BPC - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da renda per capita familiar para BPC/LOAS com IA. Calcula renda per capita básica dividindo renda total pelo número de membros do grupo familiar, compara com limite legal de 1/4 do salário mínimo, informa de forma objetiva se há elegibilidade pela renda. Versão resumida para triagem inicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c7d3f8a4-9e2b-4f5c-a1d6-3e8b7c4f9a2d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PETIÇÃO INICIAL - GERAÇÃO COMPLETA',
      description:
        'Geração completa de petição inicial previdenciária com IA. Analisa documentos, fatos, direito aplicável, jurisprudência favorável, gerando peça processual estruturada com qualificação das partes, fundamentação jurídica detalhada, pedidos principais e alternativos, requerimentos de provas e valor da causa. Conteúdo pronto para revisão e ajustes finais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f2a5c4-7d3b-5e9a-a6d1-2c8d9b5e3a7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PETIÇÃO INICIAL - GERAÇÃO SIMPLIFICADA',
      description:
        'Geração simplificada de petição inicial em linguagem acessível com IA. Cria minuta de petição com estrutura básica, fundamentação jurídica objetiva e pedidos essenciais, utilizando linguagem clara sem termos técnicos complexos. Ideal para apresentação ao cliente ou casos de menor complexidade jurídica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f9a3b6d5-8e4c-5a1b-b7e2-3d9e0c6f8b1a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE REQUERIMENTO ADMINISTRATIVO - GERAÇÃO COMPLETA',
      description:
        'Geração completa de requerimento administrativo ao INSS com IA. Analisa documentos, direito aplicável e instruções normativas do INSS, gerando requerimento estruturado com identificação do requerente, fundamentação legal e administrativa detalhada, pedido específico, anexação de documentos comprobatórios e protocolo. Conteúdo pronto para envio.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a0b4c7e6-9f5d-4b2c-a8d3-4e0f1d7a2c9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE REQUERIMENTO ADMINISTRATIVO - GERAÇÃO SIMPLIFICADA',
      description:
        'Geração simplificada de requerimento administrativo ao INSS em linguagem acessível com IA. Cria minuta de requerimento com estrutura básica, fundamentação objetiva e pedido direto, utilizando linguagem clara. Ideal para apresentação ao cliente ou requerimentos administrativos de menor complexidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c5d8f7-a0e6-4c3d-b9e4-5f1a2e8b3d0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PARECER - GERAÇÃO COMPLETA',
      description:
        'Geração completa de parecer jurídico previdenciário com IA. Analisa todo o caso, documentos, legislação e jurisprudência aplicável, gerando parecer técnico estruturado com relatório dos fatos, fundamentação jurídica aprofundada, análise de viabilidade, riscos processuais, teses aplicáveis e conclusão fundamentada. Documento técnico para orientação estratégica completa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d6e9a8-b1f7-4d2e-a0f5-6a2b3f9c4e1d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PARECER - GERAÇÃO SIMPLIFICADA',
      description:
        'Geração simplificada de parecer jurídico em linguagem acessível com IA. Cria parecer objetivo com resumo dos fatos, fundamentação jurídica básica, análise sintética de viabilidade e conclusão clara, utilizando linguagem compreensível. Ideal para apresentação ao cliente ou pareceres consultivos de menor complexidade técnica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ddb8a0da-7049-493b-b256-668cdcc88f8b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS,
      creditCost: 2,
      title:
        'LINHA DO TEMPO RURAL - ANÁLISE DE IMPACTO DE CONTRIBUIÇÃO EM ATRASO',
      description:
        'Análise de impacto de contribuições em atraso sobre períodos de atividade rural com IA. Examina CNIS do período de contribuição, identifica recolhimentos em atraso, avalia se o atraso prejudica reconhecimento do tempo rural anterior, calcula consequências previdenciárias (perda de carência, qualidade de segurado), orienta sobre regularização contributiva.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f9a0b1-c2d3-4e5f-ba7b-8c9d0e1f2a3b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'LINHA DO TEMPO RURAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da linha do tempo rural com IA. Examina períodos rurais cadastrados de forma objetiva, identifica documentação básica apresentada, verifica presença de início de prova material, calcula tempo rural total alegado e informa de forma resumida sobre viabilidade geral de reconhecimento. Versão rápida para triagem inicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('36bcef6c-889f-4493-93d8-ba3457398caa'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION,
      creditCost: 1,
      title:
        'LINHA DO TEMPO RURAL - SIMULAÇÃO DE AJUSTE DE PERÍODO DE CONTRIBUIÇÃO',
      description:
        'Simulação de ajuste de período de contribuição CNIS com geração de observação técnica previdenciária por IA. Compara o período original registrado no CNIS com o período convencional proposto, calcula o tempo de contribuição ganho com o ajuste e gera fundamentação técnica formal indicando a justificativa previdenciária e o impacto no cômputo do tempo de contribuição rural.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f9a0b1-c2d3-4e5f-ba5b-8c9d0e1f2a3b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'PLANEJAMENTO DE APOSENTADORIA POR INVALIDEZ - ANÁLISE COMPLETA',
      description:
        'Análise completa de planejamento de aposentadoria por invalidez com geração de parecer técnico previdenciário por IA. Avalia os períodos de contribuição, benefícios INSS, remunerações, afastamentos por incapacidade, atividades especiais e documentos probatórios, calculando o direito à aposentadoria por invalidez e gerando fundamentação técnica detalhada com estratégia de concessão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f9a0b1-c2d3-4e5f-ba6b-8c9d0e1f2a3b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS,
      creditCost: 4,
      title:
        'PLANEJAMENTO DE APOSENTADORIA POR INVALIDEZ - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de planejamento de aposentadoria por invalidez com geração de parecer técnico previdenciário por IA. Avalia os principais elementos do processo como períodos de contribuição, benefícios INSS e afastamentos por incapacidade, gerando uma análise objetiva do direito à aposentadoria por invalidez com os próximos passos recomendados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f9a0b1-c2d3-4e5f-ba8b-8c9d0e1f2a3b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_ADMINISTRATIVE_PROCESS_ANALYSIS,
      creditCost: 3,
      title:
        'PLANEJAMENTO DE APOSENTADORIA POR INVALIDEZ - ANÁLISE DE PROCESSO ADMINISTRATIVO',
      description:
        'Análise de documentos de processo administrativo para planejamento de aposentadoria da pessoa com deficiência com IA. Examina documentos PDF do processo administrativo do INSS, identifica informações relevantes sobre o requerimento, avalia fundamentos e inconsistências, e gera um relatório em markdown com análise técnica detalhada e orientações estratégicas.',
    }),
  ];

export class PaymentPlanPaidResourceSeeder implements SeederInterface {
  protected readonly _type = PaymentPlanPaidResourceSeeder.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceCommandRepositoryGateway)
    public readonly paymentPlanPaidResourceCommandRepositoryGateway: PaymentPlanPaidResourceCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    public readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    for (const resourceData of PAYMENT_PLAN_PAID_RESOURCE_SEED) {
      const existing =
        await this.paymentPlanPaidResourceQueryRepositoryGateway.findOnePaymentPlanPaidResourceByResourceType(
          resourceData.resource,
        );

      if (existing) {
        const entity = new PaymentPlanPaidResourceEntity({
          ...existing,
          ...resourceData,
        });

        transactions.push(
          this.paymentPlanPaidResourceCommandRepositoryGateway.updatePaymentPlanPaidResource(
            existing.id,
            entity,
          ),
        );

        continue;
      }

      const entity = new PaymentPlanPaidResourceEntity(resourceData);

      transactions.push(
        this.paymentPlanPaidResourceCommandRepositoryGateway.createPaymentPlanPaidResource(
          entity,
        ),
      );
    }

    return transactions;
  }
}

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
      title: 'PEÇA PROCESSUAL - ANÁLISE COMPLETA',
      description:
        'Análise completa de petições iniciais, contestações, recursos e outras peças processuais com IA. Gera parecer detalhado sobre argumentação, fundamentação legal, pontos fortes e fracos, e sugestões de melhoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d576bf-323b-4f3f-aec4-dce4e2c90988'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'PEÇA PROCESSUAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de peças processuais com IA, gerando parecer objetivo sobre adequação da argumentação, presença dos requisitos essenciais e principais pontos de atenção. Versão resumida para revisões rápidas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6caaef15-be5f-4f93-84c8-ed8d0c6c283b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
      creditCost: 3,
      title: 'PEÇA PROCESSUAL - ANÁLISE RÁPIDA DE DOCUMENTOS',
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
      id: new PaymentPlanPaidResourceId('a77f0e13-2a67-497a-bc4b-7f2215b31f6f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'PLANEJAMENTO PREVIDENCIÁRIO DE PROFESSOR - ANÁLISE COMPLETA',
      description:
        'Planejamento completo de aposentadoria para professor com IA. Analisa períodos de magistério, vínculos por instituição, remunerações, benefícios e processos para estimar cenários e estratégia previdenciária mais vantajosa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7b2d3112-f0f1-46f4-9d35-e7ebf4cc2705'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'PLANEJAMENTO PREVIDENCIÁRIO DE PROFESSOR - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do planejamento previdenciário de professor com IA, apresentando diagnóstico objetivo de elegibilidade, pontos de atenção e próximos passos recomendados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'APOSENTADORIA DO PROFESSOR RPPS - ANÁLISE COMPLETA',
      description:
        'Planejamento completo de aposentadoria para professor do RPPS com IA. Analisa períodos de magistério no serviço público, vínculos por instituição, remunerações, regras específicas do ente federativo e processos para estimar cenários e estratégia previdenciária mais vantajosa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'APOSENTADORIA DO PROFESSOR RPPS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da aposentadoria do professor no RPPS com IA, apresentando diagnóstico objetivo de elegibilidade, pontos de atenção e próximos passos recomendados para o regime próprio de previdência social.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c32c6734-bb4a-405f-8c84-5199848b1dcb'),
      resource: PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
      creditCost: 0,
      title: 'ACOMPANHAMENTO DE PROCESSOS - EPROC',
      description:
        'Acompanhamento automático e contínuo de processos jurídicos nos tribunais. Sistema monitora movimentações processuais em tempo real, emite notificações sobre atualizações importantes, mantém histórico completo de andamentos e alertas de prazos críticos.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('bd9b379c-0e54-4ede-a3da-476185e69f8e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS,
      creditCost: 0.3,
      title: 'ASSISTENTE ELOY - QUESTÕES PREVIDENCIÁRIAS',
      description:
        'Assistente de IA especializado em responder dúvidas sobre direito previdenciário. Esclarece questões sobre benefícios do INSS, requisitos para aposentadoria, pensão e auxílios, documentação necessária, prazos processuais e procedimentos administrativos, fornecendo fundamentação legal completa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('056fa86a-6a7e-49fc-941a-477ec9a28f56'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_LEGISLATION_QUESTIONS,
      creditCost: 0.3,
      title: 'ASSISTENTE ELOY - CONSULTA DE LEGISLAÇÃO PREVIDENCIÁRIA',
      description:
        'Assistente de IA especializado em legislação previdenciária. Consulta e interpreta leis, decretos, instruções normativas do INSS, portarias, medidas provisórias e regulamentos do RGPS e RPPS, fornecendo citações precisas com número da norma, artigo e interpretação contextualizada aplicada ao caso concreto.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('98ce2c1e-52f3-4dbd-a2f9-9a7972db4c17'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH,
      creditCost: 0.3,
      title: 'ASSISTENTE ELOY - PESQUISA DE TESES JURÍDICAS VITORIOSAS',
      description:
        'Assistente de IA para pesquisa de teses jurídicas vitoriosas em direito previdenciário. Identifica precedentes favoráveis em tribunais superiores (STF, STJ, TNU), súmulas vinculantes e não vinculantes, recursos repetitivos com repercussão geral, jurisprudência consolidada e decisões recentes, fornecendo estratégias argumentativas baseadas em casos vencedores.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d146fdb8-8511-472e-9f0c-dc9d5fb0d2ad'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_ANALYSIS,
      creditCost: 0.3,
      title: 'ASSISTENTE ELOY - ANÁLISE INTELIGENTE DE DOCUMENTOS E CASOS',
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
      title: 'ANÁLISE DE QUALIDADE DE SEGURADO E CARÊNCIA - ANÁLISE COMPLETA',
      description:
        'Análise completa da qualidade de segurado e carência com IA. Verifica manutenção da qualidade de segurado, calcula período de graça, conta carências por tipo de benefício (aposentadoria, auxílio-doença, salário-maternidade), identifica lacunas contributivas e risco de perda de qualidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a0f3c5e4-9d2a-4a1a-8c2f-7b6d5e3a4c12'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INSURANCE_QUALITY_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title:
        'ANÁLISE DE QUALIDADE DE SEGURADO E CARÊNCIA - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da qualidade de segurado com IA. Verifica situação atual (segurado ativo ou em período de graça), informa carência total de contribuições, alerta sobre proximidade de perda da qualidade de segurado. Versão resumida para verificações rápidas.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('87c9db53-a1bb-46da-8fe4-a97bb2b7b703'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'PROCESSO ADMINISTRATIVO DO INSS - ANÁLISE COMPLETA',
      description:
        'Análise completa de processos administrativos no INSS com IA. Examina pedidos de benefício, recursos ao INSS, exigências documentais, pareceres médicos e sociais, indeferimentos, gerando relatório detalhado sobre andamento, prazos, irregularidades e estratégia de contestação ou complementação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('87c9db53-a1bb-46da-8fe2-a94bb2b7b703'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'PROCESSO ADMINISTRATIVO DO INSS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de processos administrativos no INSS com IA. Identifica status atual do pedido, prazo decorrido, principais pendências ou motivos de indeferimento, próximos passos recomendados. Versão resumida para acompanhamento objetivo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'ANÁLISE DE PROCESSOS JUDICIAIS - ANÁLISE COMPLETA',
      description:
        'Análise completa de processos judiciais previdenciários com IA. Examina petição inicial, contestação, provas, laudos periciais, sentenças e acórdãos, identificando fundamentos jurídicos utilizados, teses defensivas, chances de êxito, pontos frágeis e estratégias processuais recomendadas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f94f5d7f-d7fb-4b92-a00c-f84f6329c132'),
      resource:
        PaymentPlanPaidResourceTypeEnum.JUDICIAL_CASE_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'ANÁLISE DE PROCESSOS JUDICIAIS - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de processos judiciais previdenciários com IA. Identifica pedido principal, fundamentos jurídicos básicos, fase processual atual, argumentos da defesa e estimativa resumida de chances de êxito. Versão objetiva para visão geral rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e9bfa47e-d159-4b54-8ef4-05dfc6c655d2'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'GERADOR DE QUESITOS MÉDICOS - ANÁLISE COMPLETA',
      description:
        'Geração completa de perguntas médicas estratégicas com IA para laudos e perícias. Analisa patologias alegadas, CID relacionados, documentos médicos apresentados, gerando questionário técnico para médico assistente ou perito, visando comprovar incapacidade laborativa ou condições de saúde.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d5c8e1f2-a3b4-4c5d-8e6f-7a8b9c0d1e2f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_QUESTION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE QUESITOS MÉDICOS - ANÁLISE SIMPLIFICADA',
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
      id: new PaymentPlanPaidResourceId('2b1c7e6a-0f3d-4a9d-8b2e-8f1a6c3d5e90'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO APOSENTADORIA ESPECIAL - ANÁLISE COMPLETA',
      description:
        'Análise completa da concessão de aposentadoria especial com IA. Examina CNIS e PPPs, aponta pendências (PEXT, competências abaixo do mínimo, vínculos sem data fim) e entrega recomendações estratégicas para requerimento administrativo e/ou ação judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c1a6f4-7d3e-4c2b-9a1e-0f3d4a9d8b2e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO APOSENTADORIA ESPECIAL - FIRST ANALYSIS',
      description:
        'First analysis da concessão de aposentadoria especial com IA. Gera resumo de tempo e carência, períodos com remunerações e agentes, diagnóstico técnico e linha do tempo integrada com base em CNIS e documentos anexados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6f4a2c1d-9b7e-4d1a-8c3f-1a2b3c4d5e6f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO APOSENTADORIA ESPECIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da concessão de aposentadoria especial com IA. Resume elegibilidade, principais pendências e próximos passos recomendados, baseada em CNIS e PPPs.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('3d6a2e4f-7c2b-4a6e-8f5d-2b1c0e9a7d3f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS,
      creditCost: 2,
      title: 'ANÁLISE DE DOCUMENTO DE PERÍODO SEM DATA FIM',
      description:
        'Análise de documento de período sem data fim com IA. Com base no arquivo enviado, a IA identifica a data de encerramento do vínculo ou período e elabora observação técnica detalhada em markdown com os elementos relevantes encontrados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4e9d2c1b-6a7f-4d8e-9b3c-1f2a3d4e5b6c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA ESPECIAL - ANÁLISE COMPLETA',
      description:
        'Análise completa do indeferimento de aposentadoria especial com IA. Examina CNIS, PPPs e demais documentos para validar tempo especial, carência, requisitos das regras aplicáveis, riscos do caso e estratégia administrativa ou judicial mais adequada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7b1e3c4d-5a6f-4c8d-9e2b-3a1f6d7c8b9e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA ESPECIAL - FIRST ANALYSIS',
      description:
        'First analysis do indeferimento de aposentadoria especial com IA. Consolida vínculos, carência, qualidade de segurado, períodos especiais, agentes nocivos, pendências documentais e diagnóstico técnico inicial com base em CNIS e documentos anexados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('9c2a5e7b-1d4f-4a8c-8e3b-6d1f2a7c5b4e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA ESPECIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do indeferimento de aposentadoria especial com IA. Resume elegibilidade, pontos favoráveis, pendências, riscos e próximos passos recomendados para avaliação rápida da viabilidade do caso.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('0a308887-2dc9-4194-a9dd-b2b94c3ab820'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'IMPUGNAÇÃO A LAUDOS MÉDICOS E SOCIAIS - ANÁLISE COMPLETA',
      description:
        'Geração completa de impugnação a laudos periciais (médicos e sociais) do INSS com IA. Analisa laudo contestado, identifica inconsistências técnicas, contradições com documentação médica apresentada, gera argumentação jurídica fundamentada e quesitos técnicos para novo exame pericial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('79b3f020-6f89-4ebb-8558-f3bc3090b70e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'IMPUGNAÇÃO A LAUDOS MÉDICOS E SOCIAIS - ANÁLISE SIMPLIFICADA',
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
      title: 'AVALIAÇÃO DEFICIÊNCIA PARA BPC - ANÁLISE COMPLETA',
      description:
        'Análise completa da deficiência para Benefício de Prestação Continuada (BPC/LOAS) com IA. Examina laudos médicos, CIF (Classificação Internacional de Funcionalidade), avalia impedimentos de longo prazo, barreiras sociais e participação plena na sociedade, gerando parecer fundamentado sobre enquadramento legal da deficiência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b8c9d0e1-f2a3-4b4c-9d5e-7f8a9b0c1d2e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'AVALIAÇÃO DEFICIÊNCIA PARA BPC - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da deficiência para BPC/LOAS com IA. Verifica presença de impedimentos de longo prazo documentados, avalia de forma objetiva se há indícios de deficiência elegível ao BPC conforme conceito legal. Versão resumida para triagem inicial de viabilidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5798a2ae-9656-4b82-acdf-cc68cc4b8659'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE COMPLETA',
      description:
        'Análise completa da linha do tempo rural com IA, examinando todos os períodos de atividade rural cadastrados, documentos comprobatórios de cada período e contribuições CNIS relacionadas. Gera parecer técnico consolidado sobre viabilidade de reconhecimento, suficiência probatória, lacunas documentais e orientações estratégicas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_INDIVIDUAL_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 1,
      title:
        'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE DE DOCUMENTO INDIVIDUAL DE PERÍODO',
      description:
        'Análise individual de um único documento comprobatório de atividade rural com IA. Valida autenticidade formal, identifica período coberto, examina conteúdo probatório (declaração sindical, nota fiscal, contrato, ITR), avalia força probatória isolada e necessidade de documentos complementares para aquele período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('784afb91-db0b-40b3-9af4-6f453c70d6de'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_ANALYSIS_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 3,
      title:
        'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE CONSOLIDADA DE DOCUMENTOS DO PERÍODO',
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
        'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE CONSOLIDADA GERAL DE TODOS OS DOCUMENTOS',
      description:
        'Análise consolidada geral de todos os documentos comprobatórios de todos os períodos da linha do tempo rural com IA. Examina conjunto probatório completo considerando múltiplos períodos rurais, identifica sobreposições, lacunas temporais, consistência entre períodos distintos, gerando parecer técnico unificado sobre viabilidade global de reconhecimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d7e8f9a0-b1c2-4d3e-9f0a-4b5c6d7e8f9a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'ANÁLISE DE RENDA PER CAPITA PARA BPC - ANÁLISE COMPLETA',
      description:
        'Análise completa da renda per capita familiar para elegibilidade ao BPC/LOAS com IA. Examina composição do grupo familiar, rendas de todos os membros, benefícios recebidos, despesas dedutíveis (medicamentos de uso contínuo), calcula renda per capita conforme legislação vigente e jurisprudência favorável, identifica possibilidades de enquadramento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'ANÁLISE DE RENDA PER CAPITA PARA BPC - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da renda per capita familiar para BPC/LOAS com IA. Calcula renda per capita básica dividindo renda total pelo número de membros do grupo familiar, compara com limite legal de 1/4 do salário mínimo, informa de forma objetiva se há elegibilidade pela renda. Versão resumida para triagem inicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c7d3f8a4-9e2b-4f5c-a1d6-3e8b7c4f9a2d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PETIÇÃO INICIAL - ANÁLISE COMPLETA',
      description:
        'Geração completa de petição inicial previdenciária com IA. Analisa documentos, fatos, direito aplicável, jurisprudência favorável, gerando peça processual estruturada com qualificação das partes, fundamentação jurídica detalhada, pedidos principais e alternativos, requerimentos de provas e valor da causa. Conteúdo pronto para revisão e ajustes finais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f2a5c4-7d3b-5e9a-a6d1-2c8d9b5e3a7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.INITIAL_PETITION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PETIÇÃO INICIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de petição inicial em linguagem acessível com IA. Cria minuta de petição com estrutura básica, fundamentação jurídica objetiva e pedidos essenciais, utilizando linguagem clara sem termos técnicos complexos. Ideal para apresentação ao cliente ou casos de menor complexidade jurídica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f9a3b6d5-8e4c-5a1b-b7e2-3d9e0c6f8b1a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE REQUERIMENTO ADMINISTRATIVO - ANÁLISE COMPLETA',
      description:
        'Geração completa de requerimento administrativo ao INSS com IA. Analisa documentos, direito aplicável e instruções normativas do INSS, gerando requerimento estruturado com identificação do requerente, fundamentação legal e administrativa detalhada, pedido específico, anexação de documentos comprobatórios e protocolo. Conteúdo pronto para envio.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a0b4c7e6-9f5d-4b2c-a8d3-4e0f1d7a2c9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_REQUEST_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE REQUERIMENTO ADMINISTRATIVO - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de requerimento administrativo ao INSS em linguagem acessível com IA. Cria minuta de requerimento com estrutura básica, fundamentação objetiva e pedido direto, utilizando linguagem clara. Ideal para apresentação ao cliente ou requerimentos administrativos de menor complexidade.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c5d8f7-a0e6-4c3d-b9e4-5f1a2e8b3d0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PARECER - ANÁLISE COMPLETA',
      description:
        'Geração completa de parecer jurídico previdenciário com IA. Analisa todo o caso, documentos, legislação e jurisprudência aplicável, gerando parecer técnico estruturado com relatório dos fatos, fundamentação jurídica aprofundada, análise de viabilidade, riscos processuais, teses aplicáveis e conclusão fundamentada. Documento técnico para orientação estratégica completa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d6e9a8-b1f7-4d2e-a0f5-6a2b3f9c4e1d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.FULL_OPINION_GENERATOR_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      title: 'GERADOR DE PARECER - ANÁLISE SIMPLIFICADA',
      description:
        'Geração simplificada de parecer jurídico em linguagem acessível com IA. Cria parecer objetivo com resumo dos fatos, fundamentação jurídica básica, análise sintética de viabilidade e conclusão clara, utilizando linguagem compreensível. Ideal para apresentação ao cliente ou pareceres consultivos de menor complexidade técnica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ddb8a0da-7049-493b-b256-668cdcc88f8b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_IMPACT_ANALYSIS,
      creditCost: 2,
      title:
        'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE DE IMPACTO DE CONTRIBUIÇÃO EM ATRASO',
      description:
        'Análise de impacto de contribuições em atraso sobre períodos de atividade rural com IA. Examina CNIS do período de contribuição, identifica recolhimentos em atraso, avalia se o atraso prejudica reconhecimento do tempo rural anterior, calcula consequências previdenciárias (perda de carência, qualidade de segurado), orienta sobre regularização contributiva.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e8f9a0b1-c2d3-4e5f-ba7b-8c9d0e1f2a3b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE DE LINHA DO TEMPO RURAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da linha do tempo rural com IA. Examina períodos rurais cadastrados de forma objetiva, identifica documentação básica apresentada, verifica presença de início de prova material, calcula tempo rural total alegado e informa de forma resumida sobre viabilidade geral de reconhecimento. Versão rápida para triagem inicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('1cc78d22-38c4-42bf-859c-719f1955132f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE DE APOSENTADORIA URBANA GERAL - ANÁLISE COMPLETA',
      description:
        'Análise completa de aposentadoria urbana geral com IA. Examina documentos, legislação, jurisprudência aplicável, gerando parecer técnico estruturado com relatório dos fatos, fundamentação jurídica aprofundada, análise de viabilidade, riscos processuais, teses aplicáveis e conclusão fundamentada. Documento técnico para orientação estratégica completa.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('04d68adc-e0a0-4200-a64a-89a3d094dfda'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'ANÁLISE DE APOSENTADORIA URBANA GERAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de aposentadoria urbana geral com IA. Examina documentos, legislação, jurisprudência aplicável, gerando parecer técnico estruturado com resumo dos fatos, fundamentação jurídica básica, análise sintética de viabilidade e conclusão clara. Documento técnico para orientação estratégica simplificada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('cdbb873c-f734-4120-81e7-5302631d3a29'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_ADMINISTRATIVE_REQUEST_DENIED_ANALYSIS,
      creditCost: 5,
      title:
        'ANÁLISE DE APOSENTADORIA URBANA GERAL - ANÁLISE DE PROCESSO ADMINISTRATIVO INDEFERIDO',
      description:
        'Análise de processo administrativo indeferido para aposentadoria urbana geral com IA. Examina documentos, legislação, jurisprudência aplicável, gerando parecer técnico estruturado com resumo dos fatos, fundamentação jurídica básica, análise sintética de viabilidade e conclusão clara. Documento técnico para orientação estratégica simplificada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('2059110f-7ad7-4cbf-9761-80b3796d857f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_BENEFIT_AWARD_LETTER_ANALYSIS,
      creditCost: 5,
      title:
        'ANÁLISE DE APOSENTADORIA URBANA GERAL - ANÁLISE DE CARTA DE CONCESSÃO',
      description:
        'Análise de carta de concessão para aposentadoria urbana geral com IA. Examina documentos, legislação, jurisprudência aplicável, gerando parecer técnico estruturado com resumo dos fatos, fundamentação jurídica básica, análise sintética de viabilidade e conclusão clara. Documento técnico para orientação estratégica simplificada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_CNIS_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DO CNIS',
      description:
        'Análise do CNIS com IA para concessão de aposentadoria urbana geral. Calcula tempo de contribuição, identifica períodos com e sem recolhimento, verifica carência e qualidade de segurado, gerando projeções de elegibilidade para diferentes modalidades de aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4f6a8b2c-7d1e-4c93-8a5f-2b7e1d9c6a4f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_COMPARE_CNIS_CTPS,
      creditCost: 4,
      title: 'CONCESSÃO APOSENTADORIA URBANA GERAL - COMPARAÇÃO CNIS E CTPS',
      description:
        'Comparação inteligente entre vínculos do CNIS e anotações da CTPS com IA para concessão de aposentadoria urbana geral. Identifica períodos divergentes, vínculos omissos no CNIS, inconsistências de datas e dados, gerando relatório de períodos que podem ser reconhecidos judicialmente ou administrativamente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4c9d-8e1f-2a3b4c5d6e7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_SPECIAL_PERIOD_PPP_ANALYSIS,
      creditCost: 6,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE PERÍODOS ESPECIAIS PPP',
      description:
        'Análise de períodos de trabalho especial com base no PPP para concessão de aposentadoria urbana geral usando IA. Identifica exposição a agentes nocivos, valida enquadramento legal por período histórico, calcula conversão de tempo especial em comum e impacto na aposentadoria.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4e5f6a7-b8c9-4d0e-8f2a-3b4c5d6e7f8a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_NO_END_DATE_DOCUMENTS_ANALYSIS,
      creditCost: 5,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE DOCUMENTOS SEM DATA FIM',
      description:
        'Análise de vínculos empregatícios e atividades sem data de término usando IA para concessão de aposentadoria urbana geral. Examina contratos de trabalho vigentes, atividades autônomas em andamento, vínculos não baixados no CNIS, calculando projeções de tempo futuro e elegibilidade progressiva.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5f6a7b8-c9d0-4e1f-8a3b-4c5d6e7f8a9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário na concessão de aposentadoria urbana geral. Examina documentos comprobatórios, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6a7b8c9-d0e1-4f2a-8b4c-5d6e7f8a9b0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário na concessão de aposentadoria urbana geral. Valida certificados de reservista, calcula período computável, verifica sobreposição com vínculos civis, orienta sobre procedimento de averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a7b3c9d0-e1f2-4a3b-8c5d-6e7f8a9b0c1d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público com IA para averbação no RGPS na concessão de aposentadoria urbana geral. Examina CTC, valida períodos computáveis, identifica possíveis recusas de averbação e orienta sobre contestação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b8c9d0e1-f2a3-4b4c-8d6e-7f8a9b0c1d2e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS usando IA para concessão de aposentadoria urbana geral. Identifica períodos omissos, valida autenticidade das anotações, avalia viabilidade de reconhecimento administrativo ou necessidade de ação judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c9d0e1f2-a3b4-4c5d-8e7f-8a9b0c1d2e3f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz com IA para reconhecimento previdenciário na concessão de aposentadoria urbana geral. Valida contratos de aprendizagem, verifica recolhimentos ao INSS, calcula período computável conforme legislação vigente à época.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d0e1f2a3-b4c5-4d6e-8f8a-9b0c1d2e3f4a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS na concessão de aposentadoria urbana geral. Examina acordos internacionais de previdência social, valida documentação estrangeira, orienta sobre apostilamento e tradução juramentada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal com IA para concessão de aposentadoria urbana geral. Examina RPA, notas fiscais de serviço, carnês de contribuição, valida recolhimentos em atraso, calcula viabilidade de indenização e impacto no tempo de contribuição.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE DECISÕES DA JUSTIÇA DO TRABALHO',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento de vínculo previdenciário na concessão de aposentadoria urbana geral. Examina decisões judiciais transitadas em julgado, valida reconhecimento de vínculo empregatício, calcula período e salários de contribuição homologados.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a3b4c5d6-e7f8-4a9b-8c1d-2e3f4a5b6c7d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE REGRAS FINAIS',
      description:
        'Análise comparativa final de todas as regras de aposentadoria disponíveis no RGPS usando IA para concessão de aposentadoria urbana geral. Simula aposentadoria por idade, tempo de contribuição, regras de transição, calcula valores estimados, identifica regra mais vantajosa e melhor momento para requerer.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b4c5d6e7-f8a9-4b0c-9d2e-3f4a5b6c7d8e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'CONCESSÃO APOSENTADORIA URBANA GERAL - ANÁLISE SIMPLIFICADA',
      description:
        'Versão simplificada da análise final de concessão de aposentadoria urbana geral com IA. Resume regras elegíveis, datas projetadas, RMI estimada e recomendação prática em linguagem acessível, mantendo os principais pontos técnicos para tomada de decisão rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('36bcef6c-889f-4493-93d8-ba3457398caa'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION,
      creditCost: 1,
      title:
        'ANÁLISE DE LINHA DO TEMPO RURAL - SIMULAÇÃO DE AJUSTE DE PERÍODO DE CONTRIBUIÇÃO',
      description:
        'Simulação de ajuste de período de contribuição CNIS com geração de observação técnica previdenciária por IA. Compara o período original registrado no CNIS com o período convencional proposto, calcula o tempo de contribuição ganho com o ajuste e gera fundamentação técnica formal indicando a justificativa previdenciária e o impacto no cômputo do tempo de contribuição rural.',
    }),

    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('36bcef4c-889f-4493-93d8-ba3457398caa'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_ADMINISTRATIVE_PROCESS_ANALYSIS,
      creditCost: 1,
      title:
        'PLANEJAMENTO DE APOSENTADORIA PARA PROFESSORES - ANÁLISE DE PROCESSO ADMINISTRATIVO',
      description:
        'Análise de processos administrativos relacionados à aposentadoria de professores com IA. Examina requerimentos administrativos, recursos, decisões do INSS, identificando fundamentos utilizados, requisitos legais aplicados, prazos e estratégias para otimização do processo administrativo visando reconhecimento da aposentadoria especial para professores.',
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
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a4d9f8b7-3c21-4e6a-9f5d-0b2c7e1a8d34'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE COMPLETA',
      description:
        'Análise completa de concessão de aposentadoria da pessoa com deficiência com IA. Consolida os períodos contributivos, períodos de deficiência, benefícios, processos judiciais e aceleradores de tempo, gerando parecer técnico detalhado sobre enquadramento legal, viabilidade do benefício, cenários de concessão e estratégia recomendada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b5e0a9c8-4d32-4f7b-8a6e-1c3d8f2b9e45'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de concessão de aposentadoria da pessoa com deficiência com IA. Resume os principais períodos reconhecíveis, o grau e a duração da deficiência, os pontos críticos do caso e a viabilidade geral do benefício, com orientação objetiva para tomada de decisão rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c6f1b0d9-5e43-409c-9b7f-2d4e9a3c0f56'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - PRIMEIRO STEP',
      description:
        'Primeira análise da concessão de aposentadoria da pessoa com deficiência com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes e viabilidade preliminar do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b001'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário na concessão de aposentadoria da pessoa com deficiência. Examina documentos comprobatórios, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b002'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário na concessão de aposentadoria da pessoa com deficiência. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b003'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público com IA para averbação no RGPS na concessão de aposentadoria da pessoa com deficiência. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b004'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS usando IA para concessão de aposentadoria da pessoa com deficiência. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b005'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz com IA para reconhecimento previdenciário na concessão de aposentadoria da pessoa com deficiência. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b006'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS na concessão de aposentadoria da pessoa com deficiência. Examina acordos internacionais, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b007'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal com IA para concessão de aposentadoria da pessoa com deficiência. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b008'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento previdenciário na concessão de aposentadoria da pessoa com deficiência. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b571f2fd-ae3a-4749-90a9-26942f613cd1'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário. Examina documentos comprobatórios, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4461fbd7-b0cb-4f16-ba26-722a52b423eb'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('caea1907-6ea2-4394-bce9-ec14b6db3b81'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público com IA para averbação no RGPS. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('dd3de53d-e64f-42ba-ae8c-1c8386cc4637'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS usando IA. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7dcb035a-dd2e-4f4a-aec9-b2d77f9b7ef3'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz com IA para reconhecimento previdenciário. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d63fd41b-2609-4e24-9f84-9f746b8f0eb6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS. Examina acordos internacionais, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('fa6d1740-eb67-4064-96f6-e0c7537f2f94'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal com IA. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('0076664c-b4c2-43f3-84bf-c5cb5a33765f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title: 'ACELERADOR DE TEMPO - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento previdenciário. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e7b3d2c1-7a65-42be-9da1-4f6071c2b009'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_PPP_ANALYSIS,
      creditCost: 4,
      title:
        'APOSENTADORIA DA PESSOA COM DEFICIÊNCIA (CONCESSÃO) - ANÁLISE DE PPP',
      description:
        'Análise do Perfil Profissiográfico Previdenciário (PPP) com IA para identificação e estruturação de períodos contributivos na concessão de aposentadoria da pessoa com deficiência. Extrai e organiza os dados do PPP em períodos prontos para inserção na análise, com categoria, status de deficiência, média de contribuição e origem do vínculo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c401'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE COMPLETA',
      description:
        'Análise completa de concessão de pensão por morte com IA. Consolida os dados do instituidor, dependentes, períodos contributivos, benefícios, processos judiciais e documentos apresentados, gerando parecer técnico detalhado sobre enquadramento legal, viabilidade da concessão, qualidade de dependente, carência e estratégia recomendada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c402'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de concessão de pensão por morte com IA. Resume os principais pontos sobre a qualidade de segurado do instituidor, a condição dos dependentes, os documentos apresentados e a viabilidade geral do benefício, com orientação objetiva para tomada de decisão rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c403'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - PRIMEIRO STEP',
      description:
        'Primeira análise da concessão de pensão por morte com IA, cruzando os dados estruturados do caso com a análise processada do CNIS do instituidor. Gera parecer inicial técnico sobre qualidade de segurado, carência, relação de dependência, documentação existente e viabilidade preliminar do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c404'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário na concessão de pensão por morte. Examina documentos comprobatórios do instituidor, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c405'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório do instituidor com IA para cômputo previdenciário na concessão de pensão por morte. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c406'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público do instituidor com IA para averbação no RGPS na concessão de pensão por morte. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c407'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS do instituidor mas ausentes no CNIS usando IA para concessão de pensão por morte. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c408'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz do instituidor com IA para reconhecimento previdenciário na concessão de pensão por morte. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c409'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior do instituidor com IA para reconhecimento no RGPS na concessão de pensão por morte. Examina acordos internacionais de previdência social, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c40a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal do instituidor com IA para concessão de pensão por morte. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c40b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title: 'PENSÃO POR MORTE (CONCESSÃO) - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas do instituidor com IA para reconhecimento previdenciário na concessão de pensão por morte. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c501'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento de pensão por morte com IA. Consolida os dados do instituidor, dependentes, períodos contributivos, benefícios, processos judiciais e documentos apresentados, gerando parecer técnico detalhado sobre enquadramento legal, viabilidade da reversão, qualidade de dependente, carência e estratégia recomendada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c502'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento de pensão por morte com IA. Resume os principais pontos sobre a qualidade de segurado do instituidor, a condição dos dependentes, os documentos apresentados e a viabilidade geral da reversão, com orientação objetiva para tomada de decisão rápida.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c503'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - PRIMEIRO STEP',
      description:
        'Primeira análise do indeferimento de pensão por morte com IA, cruzando os dados estruturados do caso com a análise processada do CNIS do instituidor. Gera parecer inicial técnico sobre qualidade de segurado, carência, relação de dependência, documentação existente e viabilidade preliminar da reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c504'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do INSS com IA para pensão por morte. Examina o fundamento da negativa, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c505'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário no indeferimento de pensão por morte. Examina documentos comprobatórios do instituidor, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c506'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório do instituidor com IA para cômputo previdenciário no indeferimento de pensão por morte. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c507'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público do instituidor com IA para averbação no RGPS no indeferimento de pensão por morte. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c508'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS do instituidor mas ausentes no CNIS usando IA para indeferimento de pensão por morte. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c509'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz do instituidor com IA para reconhecimento previdenciário no indeferimento de pensão por morte. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c50a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior do instituidor com IA para reconhecimento no RGPS no indeferimento de pensão por morte. Examina acordos internacionais de previdência social, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c50b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title: 'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal do instituidor com IA para indeferimento de pensão por morte. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1f2a3b4-c5e6-4a7b-8c9d-e0f1a2b3c50c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'PENSÃO POR MORTE (INDEFERIMENTO) - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas do instituidor com IA para reconhecimento previdenciário no indeferimento de pensão por morte. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4890-abcd-ef1234567890'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS,
      creditCost: 10,
      title: 'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE COMPLETA',
      description:
        'Análise completa de aposentadoria por categoria especial com IA. Examina períodos de trabalho com exposição a agentes nocivos, verifica documentação probatória (PPP, LTCAT, laudos), calcula conversão de tempo especial para comum, verifica enquadramento nas regras de aposentadoria especial e gera parecer técnico detalhado com conclusões sobre viabilidade do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4901-bcde-f12345678901'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      title: 'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de aposentadoria por categoria especial com IA. Examina períodos especiais cadastrados de forma objetiva, identifica documentação básica apresentada, calcula tempo especial total alegado e informa de forma resumida sobre viabilidade geral de reconhecimento. Versão rápida para triagem inicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4012-9def-123456789012'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS,
      creditCost: 8,
      title: 'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE DE CONVERSÃO',
      description:
        'Análise de conversão de tempo especial para comum via IA. Processa em lotes os períodos de trabalho especial cadastrados, calcula o fator de conversão aplicável, determina o tempo especial efetivo e o tempo convertido por período, e classifica o reconhecimento de cada bloco (reconhecido, parcial ou não reconhecido).',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4e5f6a7-b8c9-4123-aefa-234567890123'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS,
      creditCost: 8,
      title: 'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE DE REGRAS',
      description:
        'Análise de regras de aposentadoria por categoria especial via IA. Verifica o enquadramento do segurado nas modalidades aplicáveis (aposentadoria especial, por pontos, por idade com tempo especial convertido), calcula datas projetadas, estima RMI e destaca a opção mais vantajosa financeiramente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5f6a7b8-c9d0-4234-bfab-345678901234'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS,
      creditCost: 10,
      title:
        'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE DE PROCESSO ADMINISTRATIVO',
      description:
        'Análise de processo administrativo de aposentadoria por categoria especial via IA. Examina os documentos do processo administrativo do INSS, identifica inconsistências, avalia fundamentos do indeferimento ou pendências, e emite parecer técnico detalhado sobre a viabilidade de contestação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a8b9c0-1d2e-4f56-8a9b-0c1d2e3f4a5b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'BENEFÍCIO POR INCAPACIDADE TEMPORÁRIA (CONCESSÃO) - PRIMEIRO STEP',
      description:
        'Primeira análise da concessão de benefício por incapacidade temporária com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre carência, contribuições recentes, períodos de afastamento e viabilidade preliminar do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4012-bcde-f01234567890'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_COMPLETE_ANALYSIS,
      creditCost: 10,
      title:
        'BENEFÍCIO POR INCAPACIDADE TEMPORÁRIA (CONCESSÃO) - ANÁLISE COMPLETA',
      description:
        'Análise completa da concessão de benefício por incapacidade temporária com IA. Avalia elegibilidade, carência, qualidade de segurado, análise de incapacidade com base nos documentos médicos e CIDs, regras de aposentadoria alternativas e emite parecer técnico conclusivo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b3c4d5e6-f7a8-4123-9def-012345678901'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'BENEFÍCIO POR INCAPACIDADE TEMPORÁRIA (CONCESSÃO) - ANÁLISE SIMPLIFICADA',
      description:
        'Geração do relatório simplificado de análise da concessão de benefício por incapacidade temporária. Converte a análise técnica completa em um documento de fácil compreensão para o cliente, adequado para download e apresentação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6a7b8c9-d0e1-4345-9abc-456789012345'),
      resource: PaymentPlanPaidResourceTypeEnum.MINI_ADVISOR_COMPLETE_ANALYSIS,
      creditCost: 3,
      title: 'MINI ASSESSOR PREVIDENCIÁRIO',
      description:
        'Análise inicial rápida com IA que identifica o tipo de benefício previdenciário mais adequado para o cliente com base em sua situação, idade, gênero, histórico de trabalho e condições de saúde. Retorna o tipo de análise recomendado com descrição do benefício e pontos de atenção.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4890-abcd-ef1234567890'),
      resource: PaymentPlanPaidResourceTypeEnum.REGULATORY_UPDATES,
      creditCost: 0,
      title: 'ATUALIZAÇÕES NORMATIVAS',
      description:
        'Acompanhamento semanal automático de atualizações normativas previdenciárias brasileiras via IA. Exibe lista e detalhe de normas publicadas (portarias, instruções normativas, resoluções) com resumo, principais alterações, status de implementação e impacto para os beneficiários.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4901-bcde-f01234567891'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'ANÁLISE DE PENSÃO POR MORTE - RESULTADO PRINCIPAL',
      description:
        'Gera o resultado principal da análise de pensão por morte: confirma qualidade de segurado do falecido, avalia direito à aposentadoria e produz análise completa e simplificada do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4012-8def-012345678912'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_RETIREMENT_RULES,
      creditCost: 0,
      title: 'ANÁLISE DE PENSÃO POR MORTE - REGRAS DE APOSENTADORIA',
      description:
        'Analisa cada regra de aposentadoria aplicável ao falecido, estimando RMI, data de direito e identificando a melhor regra.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4e5f6a7-b8c9-4123-9ef0-123456789023'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_DEPENDENT_PENSION_ANALYSES,
      creditCost: 0,
      title: 'ANÁLISE DE PENSÃO POR MORTE - ANÁLISE POR DEPENDENTE',
      description:
        'Avalia o direito à pensão de cada dependente identificado, estimando início e duração do benefício conforme art. 77 da Lei 8.213/91.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5f6a7b8-c9d0-4234-af01-234567890134'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_COMPLETE_ANALYSIS_TEXT,
      creditCost: 5,
      title: 'ANÁLISE DE PENSÃO POR MORTE - ANÁLISE COMPLETA',
      description:
        'Gera o documento de análise completa e detalhada da pensão por morte, com fundamentação jurídica, para uso profissional.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6a7b8c9-d0e1-4345-b012-345678901245'),
      resource:
        PaymentPlanPaidResourceTypeEnum.SURVIVOR_PENSION_ANALYSIS_SIMPLIFIED_ANALYSIS_TEXT,
      creditCost: 2,
      title: 'ANÁLISE DE PENSÃO POR MORTE - ANÁLISE SIMPLIFICADA',
      description:
        'Gera o documento de análise simplificada da pensão por morte, com linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c7d8e9f0-a1b2-4c3d-8e4f-5a6b7c8d9e0f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA RURAL/HÍBRIDA - PRIMEIRO STEP',
      description:
        'Primeira análise do caso de indeferimento de aposentadoria rural ou híbrida com IA. Combina os dados do CNIS com os dados estruturados do processo de indeferimento para gerar parecer inicial técnico sobre os períodos urbanos, períodos rurais, carência e viabilidade de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d8e9f0a1-b2c3-4d5e-9f0a-6b7c8d9e0f1a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'INDEFERIMENTO APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE COMPLETA',
      description:
        'Análise completa do indeferimento de aposentadoria rural ou híbrida com IA. Examina CNIS, documentos do processo administrativo e dados do caso para gerar parecer técnico detalhado com fundamentação legal, análise de provas, conformidade da linha do tempo e recomendação estratégica para recurso administrativo ou ação judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e9f0a1b2-c3d4-4e5f-af1b-7c8d9e0f1a2b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE SIMPLIFICADA',
      description:
        'Geração do documento de análise simplificada do indeferimento de aposentadoria rural ou híbrida, com linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f0a1b2c3-d4e5-4f6a-b0c1-8d9e0f1a2b3c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 2,
      title:
        'INDEFERIMENTO APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE DE DOCUMENTOS DO PERÍODO',
      description:
        'Análise individual de documentos probatórios de períodos de trabalho rural para o caso de indeferimento de aposentadoria rural ou híbrida. Identifica o tipo de documento, o nome do titular, o ano e emite nota técnica sobre a relevância probatória.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c1'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento de aposentadoria urbana comum com IA. Consolida o histórico contributivo, os períodos analisados, os aceleradores de tempo e a decisão do INSS, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c2'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento de aposentadoria urbana comum com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c3'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do INSS com IA. Examina o fundamento da negativa, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c4'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA URBANA COMUM - PRIMEIRO STEP',
      description:
        'Primeira análise de indeferimento de aposentadoria urbana comum com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c5'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria urbana comum. Examina documentos comprobatórios, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário no contexto de indeferimento de aposentadoria urbana comum. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c7'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público com IA para averbação no RGPS no contexto de indeferimento de aposentadoria urbana comum. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c8'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS com IA para indeferimento de aposentadoria urbana comum. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7c9'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria urbana comum. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7ca'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS no contexto de indeferimento de aposentadoria urbana comum. Examina acordos internacionais, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7cb'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal com IA no contexto de indeferimento de aposentadoria urbana comum. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7cc'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria urbana comum. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7cd'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_PPP_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA URBANA COMUM - ANÁLISE DE PPP',
      description:
        'Análise do Perfil Profissiográfico Previdenciário (PPP) com IA para identificação e estruturação de períodos contributivos no contexto de indeferimento de aposentadoria urbana comum. Extrai e organiza os dados do PPP em períodos prontos para inserção na análise, com categoria, média de contribuição e origem do vínculo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4890-b1c2-d3e4f5a6b7ce'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS,
      creditCost: 4,
      title:
        'INDEFERIMENTO APOSENTADORIA URBANA COMUM - COMPARAÇÃO CNIS E CTPS',
      description:
        'Comparação inteligente entre vínculos do CNIS e anotações da CTPS com IA para indeferimento de aposentadoria urbana comum. Identifica períodos divergentes, vínculos omissos no CNIS, inconsistências de datas e dados, gerando relatório de períodos que podem ser reconhecidos judicialmente ou administrativamente para reverter o indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('65805ba8-5e45-4d7c-b6db-289dd8e0e466'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO DE AUXÍLIO-ACIDENTE - PRIMEIRO STEP',
      description:
        'Primeira análise técnica de indeferimento de auxílio-acidente com IA, combinando a leitura do CNIS já processado com os dados estruturados do caso e a documentação médica apresentada. Verifica manutenção da qualidade de segurado, presença de sequelas permanentes e compatibilidade inicial entre o acidente e a redução funcional alegada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f86f4652-16ed-4712-a33e-9c10e6ee153c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_SECOND_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO DE AUXÍLIO-ACIDENTE - SEGUNDO STEP',
      description:
        'Segunda análise técnica de indeferimento de auxílio-acidente com IA, aprofundando o exame médico-jurídico do caso. Avalia sequelas consolidadas, redução da capacidade laborativa, coerência entre os documentos clínicos e o histórico do acidente, além de indicar riscos probatórios e estratégia inicial de reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a14bb96d-586f-46b0-b0f3-7362d934ee7c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'INDEFERIMENTO DE AUXÍLIO-ACIDENTE - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento de auxílio-acidente com IA. Consolida os dados previdenciários, a documentação médica e ocupacional e as conclusões preliminares para gerar parecer técnico final com impacto previdenciário, avaliação estratégica e estudo das regras de aposentadoria potencialmente afetadas pelo reconhecimento do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7fa941ec-a60f-4338-9b24-c4cf8db34c02'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO DE AUXÍLIO-ACIDENTE - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento de auxílio-acidente com IA. Resume de forma clara os achados centrais da análise completa, a viabilidade do caso, os principais riscos e os próximos passos recomendados para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de126'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento de aposentadoria da pessoa com deficiência com IA. Consolida o histórico contributivo, os períodos analisados, os aceleradores de tempo e a decisão do INSS, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de127'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento de aposentadoria da pessoa com deficiência com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de128'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do INSS com IA. Examina o fundamento da negativa, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de129'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - PRIMEIRO STEP',
      description:
        'Primeira análise de indeferimento de aposentadoria da pessoa com deficiência com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de130'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE TEMPO RURAL',
      description:
        'Análise de períodos de atividade rural com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria da pessoa com deficiência. Examina documentos comprobatórios, valida início de prova material, calcula tempo rural computável e orienta sobre reconhecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de132'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de tempo de serviço militar obrigatório com IA para cômputo previdenciário no contexto de indeferimento de aposentadoria da pessoa com deficiência. Valida certificados e certidões, calcula o período computável, verifica sobreposição com outros vínculos e orienta sobre averbação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de133'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Análise de tempo de serviço público com IA para averbação no RGPS no contexto de indeferimento de aposentadoria da pessoa com deficiência. Examina CTC, valida períodos computáveis, identifica riscos de contagem em duplicidade e orienta sobre averbação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de134'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados na CTPS mas ausentes no CNIS com IA para indeferimento de aposentadoria da pessoa com deficiência. Identifica períodos omissos, avalia a força probatória dos documentos e orienta sobre regularização no INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de135'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE ESTUDANTE APRENDIZ',
      description:
        'Análise de tempo como estudante aprendiz com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria da pessoa com deficiência. Valida documentos escolares, contraprestação e elementos probatórios necessários ao cômputo do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de136'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE TRABALHO NO EXTERIOR',
      description:
        'Análise de períodos de trabalho no exterior com IA para reconhecimento no RGPS no contexto de indeferimento de aposentadoria da pessoa com deficiência. Examina acordos internacionais, valida documentação estrangeira e orienta sobre totalização e formalidades documentais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de137'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE TRABALHO INFORMAL',
      description:
        'Análise de períodos de trabalho informal com IA no contexto de indeferimento de aposentadoria da pessoa com deficiência. Examina provas da atividade, recolhimentos existentes, necessidade de indenização e impacto do período no tempo de contribuição e na carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de138'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE DECISÃO TRABALHISTA',
      description:
        'Análise de sentenças e acordos trabalhistas com IA para reconhecimento previdenciário no contexto de indeferimento de aposentadoria da pessoa com deficiência. Examina robustez da decisão, períodos reconhecidos, remunerações e a melhor estratégia de aproveitamento perante o INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('da60c3bc-c91d-4332-aae2-b3f30d1de139'),
      resource:
        PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO APOSENTADORIA PCD - ANÁLISE DE PPP',
      description:
        'Análise do Perfil Profissiográfico Previdenciário (PPP) com IA para identificação e estruturação de períodos contributivos no contexto de indeferimento de aposentadoria da pessoa com deficiência. Extrai e organiza os dados do PPP em períodos prontos para inserção na análise, com categoria, status de deficiência, média de contribuição e origem do vínculo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e2aff6fe-3f94-489a-a206-ed48a65b8d1b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA INCAPACIDADE PERMANENTE - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do INSS com IA para aposentadoria por incapacidade permanente. Examina o fundamento da negativa, identifica erros de avaliação médica ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'INDEFERIMENTO APOSENTADORIA INCAPACIDADE PERMANENTE - PRIMEIRO STEP',
      description:
        'Primeira análise de indeferimento de aposentadoria por incapacidade permanente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre carência, qualidade de segurado, incapacidade, períodos relevantes e viabilidade preliminar de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 10,
      title:
        'INDEFERIMENTO APOSENTADORIA INCAPACIDADE PERMANENTE - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento de aposentadoria por incapacidade permanente com IA. Consolida o histórico contributivo, os períodos analisados, os dados de incapacidade e a decisão do INSS, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c60'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'INDEFERIMENTO APOSENTADORIA INCAPACIDADE PERMANENTE - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento de aposentadoria por incapacidade permanente com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b5c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'Análise de Decisão do INSS (Indeferimento Auxílio Incapacidade Temporária)',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do INSS com IA para auxílio por incapacidade temporária. Examina o fundamento da negativa, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b5d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'Primeira Análise (Indeferimento Auxílio Incapacidade Temporária)',
      description:
        'Primeira análise de indeferimento de auxílio por incapacidade temporária com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b5e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'Análise Completa (Indeferimento Auxílio Incapacidade Temporária)',
      description:
        'Análise completa de indeferimento de auxílio por incapacidade temporária com IA. Consolida o histórico contributivo, os períodos analisados, a decisão do INSS e a condição de incapacidade, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b5f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_INCAPACITY_BENEFIT_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'Análise Simplificada (Indeferimento Auxílio Incapacidade Temporária)',
      description:
        'Análise simplificada de indeferimento de auxílio por incapacidade temporária com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1c2e3f4-b5d6-4a7b-8c9d-0e1f2a3b4c5d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'BPC AO IDOSO - ANÁLISE COMPLETA',
      description:
        'Análise completa do direito ao BPC/LOAS para idosos com IA. Examina condições de elegibilidade por idade (65 anos), renda familiar per capita, composição do grupo familiar, rendas e benefícios de cada membro, despesas dedutíveis, identifica possibilidades de enquadramento e emite parecer técnico conclusivo com fundamentação legal e jurisprudencial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2d3f4a5-c6e7-4b8c-9d0e-1f2a3b4c5d6e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'BPC AO IDOSO - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do direito ao BPC/LOAS para idosos com IA. Verifica critério de idade (65 anos), calcula renda per capita familiar e compara com o limite legal de 1/4 do salário mínimo, informando de forma objetiva sobre a elegibilidade. Versão resumida e acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('eaf7638a-8141-4781-a802-38a71b8f99d8'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'APOSENTADORIA RURAL/HÍBRIDA - PRIMEIRO STEP',
      description:
        'Primeira análise do caso de aposentadoria rural ou híbrida com IA. Combina os dados do CNIS com os períodos rurais declarados pelo segurado para gerar parecer inicial técnico sobre os períodos urbanos, períodos rurais, carência e viabilidade de concessão do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5baca808-97a9-4c6a-818d-1e5221b8f8dd'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE COMPLETA',
      description:
        'Análise completa do caso de aposentadoria rural ou híbrida com IA. Examina CNIS, documentos probatórios e dados dos períodos declarados para gerar parecer técnico detalhado com fundamentação legal, análise de provas, conformidade da linha do tempo e recomendação estratégica para requerimento administrativo ou ação judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e22c1d76-2230-458e-9942-081e57a34f0f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE SIMPLIFICADA',
      description:
        'Geração do documento de análise simplificada do caso de aposentadoria rural ou híbrida, com linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ce1dc622-f336-46fc-b394-7738fb82c0ef'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS_WORK_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 2,
      title: 'APOSENTADORIA RURAL/HÍBRIDA - ANÁLISE DE DOCUMENTOS DO PERÍODO',
      description:
        'Análise individual de documentos probatórios de períodos de trabalho rural para o caso de aposentadoria rural ou híbrida. Identifica o tipo de documento, o nome do titular, o ano e emite nota técnica sobre a relevância probatória.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3e4f5a6-d7b8-4c9d-8e1f-2a3b4c5d6e7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_INSS_DECISION_ANALYSIS,
      creditCost: 4,
      title: 'INDEFERIMENTO BPC PCD - ANÁLISE DA DECISÃO INSS',
      description:
        'Análise da carta de indeferimento e documentos do processo administrativo do BPC para pessoa com deficiência. Identifica fundamentos legais da negativa, verifica erros na avaliação do grau de deficiência ou na apuração da renda familiar, aponta irregularidades processuais e recomenda estratégia de reversão (recurso ao CRPS, ação judicial ou novo requerimento).',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4f5a6b7-e8c9-4d0e-9f2a-3b4c5d6e7f8a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_FIRST_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO BPC PCD - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise técnica do caso de indeferimento do BPC para pessoa com deficiência. Cruza dados de composição familiar, renda per capita e grau de deficiência com os requisitos legais, identifica pontos de fortalecimento e lacunas, e aponta viabilidade preliminar da reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5a6b7c8-f9d0-4e1f-a23b-4c5d6e7f8a9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO BPC PCD - ANÁLISE COMPLETA',
      description:
        'Análise completa do indeferimento do BPC para pessoa com deficiência com IA. Examina critério de deficiência (perícia biopsicossocial), critério de renda familiar per capita, composição do grupo familiar, rendas e benefícios de cada membro, despesas dedutíveis, analisa os fundamentos do indeferimento e emite parecer técnico conclusivo com recomendação de estratégia de reversão fundamentada em lei e jurisprudência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6b7c8d9-a0e1-4f2a-b34c-5d6e7f8a9b0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_DENIAL_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO BPC PCD - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do indeferimento do BPC para pessoa com deficiência com IA. Verifica critério de deficiência e critério de renda familiar per capita, informa de forma objetiva e acessível sobre a possibilidade de reversão do indeferimento. Versão resumida para apresentação ao cliente ou familiar.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6b7c8d2-a0e1-4f2a-b34c-5d6e7f8a9b0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSAO BPC PCD - ANALISE COMPLETA',
      description:
        'Analise completa da concessao do BPC para pessoa com deficiencia com IA. Examina criterio de deficiencia, renda familiar per capita, grupo familiar, documentos e fundamento da decisao, com parecer tecnico conclusivo e recomendacoes de manutencao do beneficio.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6b7c8d6-a3e1-4f2a-b34c-5d6e7f8a9b0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'CONCESSAO BPC PCD - ANALISE SIMPLIFICADA',
      description:
        'Analise simplificada da concessao do BPC para pessoa com deficiencia com linguagem objetiva e acessivel para apresentacao ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4c9d-8e1f-2a3b4c5d6e7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_FIRST_ANALYSIS,
      creditCost: 2,
      title: 'CONCESSÃO SALÁRIO MATERNIDADE - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise do direito ao Salário Maternidade com IA. Verifica o evento gerador informado, a carência necessária, a qualidade de segurada no período e identifica os pontos críticos que determinam o direito ao benefício. Indicado para um diagnóstico inicial rápido sobre a viabilidade do pedido.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4e5f6a7-b8c9-4d0e-9f2a-3b4c5d6e7f8a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'CONCESSÃO SALÁRIO MATERNIDADE - ANÁLISE COMPLETA',
      description:
        'Análise completa do direito ao Salário Maternidade com IA. Examina o evento gerador, verifica a carência exigida por categoria de segurada, analisa a qualidade de segurada na data do fato gerador, avalia o histórico contributivo e os documentos apresentados, identifica possíveis impedimentos e emite parecer técnico conclusivo com fundamentação legal e jurisprudencial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5f6a7b8-c9d0-4e1f-ab3b-4c5d6e7f8a9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'CONCESSÃO SALÁRIO MATERNIDADE - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do direito ao Salário Maternidade com IA. Verifica o evento gerador, a carência e a qualidade de segurada, informando de forma objetiva sobre a elegibilidade ao benefício. Versão resumida e acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f1a2b3c4-d5e6-4f7a-b8c9-d0e1f2a3b4c5'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_FIRST_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO SALÁRIO MATERNIDADE - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise do indeferimento do Salário Maternidade com IA. Verifica o evento gerador, a qualidade de segurada, a carência e os motivos da negativa do INSS, identificando os pontos críticos para reversão do indeferimento. Indicado para um diagnóstico inicial rápido sobre a viabilidade de recurso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2b3c4d5-e6f7-4a8b-c9d0-e1f2a3b4c5d6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_SECOND_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO SALÁRIO MATERNIDADE - SEGUNDA ANÁLISE',
      description:
        'Segunda análise do indeferimento do Salário Maternidade com IA. Aprofunda a avaliação dos períodos contributivos no CNIS X-Ray, analisa pendências identificadas (contribuições abaixo do mínimo, atrasos, vínculos sem data de saída) e orienta sobre a consideração ou desconsideração de cada período para fins de carência e qualidade de segurada.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b3c4d5e6-f7a8-4b9c-d0e1-f2a3b4c5d6e7'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO SALÁRIO MATERNIDADE - ANÁLISE COMPLETA',
      description:
        'Análise completa do indeferimento do Salário Maternidade com IA. Examina o evento gerador, verifica a carência exigida por categoria de segurada, analisa a qualidade de segurada na data do fato gerador, avalia o histórico contributivo com base no CNIS X-Ray e nos documentos apresentados, identifica possíveis impedimentos e emite parecer técnico conclusivo com fundamentação legal e estratégia de reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c4d5e6f7-a8b9-4c0d-e1f2-a3b4c5d6e7f8'),
      resource:
        PaymentPlanPaidResourceTypeEnum.MATERNITY_PAY_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO SALÁRIO MATERNIDADE - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do indeferimento do Salário Maternidade com IA. Verifica o evento gerador, a carência e a qualidade de segurada, informando de forma objetiva sobre a elegibilidade ao benefício e as chances de reversão do indeferimento. Versão resumida e acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_INSS_DECISION_ANALYSIS,
      creditCost: 4,
      title: 'CESSAÇÃO BPC PCD - ANÁLISE DA DECISÃO INSS',
      description:
        'Análise da decisão de cessação do BPC para pessoa com deficiência. Examina os fundamentos da cessação, verifica se houve reavaliação adequada do grau de deficiência e da renda familiar, identifica irregularidades processuais e recomenda estratégia de reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'CESSAÇÃO BPC PCD - ANÁLISE COMPLETA',
      description:
        'Análise completa da cessação do BPC para pessoa com deficiência com IA. Examina critério de deficiência, critério de renda familiar per capita, composição do grupo familiar, avaliação de deficiência, fundamentos da cessação e emite parecer técnico conclusivo com recomendação de estratégia de reversão fundamentada em lei e jurisprudência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4c9d-8e1f-2a3b4c5d6e7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_DISABILITY_TERMINATION_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'CESSAÇÃO BPC PCD - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada da cessação do BPC para pessoa com deficiência com IA. Verifica critério de deficiência e critério de renda familiar per capita, informa de forma objetiva sobre a possibilidade de reversão da cessação. Versão resumida para apresentação ao cliente ou familiar.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1010101-1111-4aaa-8bbb-111111111111'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_CNIS_ANALYSIS,
      creditCost: 5,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DO CNIS',
      description:
        'Leitura estruturada do CNIS para revisão de aposentadoria urbana geral, com geração de períodos, histórico remuneratório e identificação de pendências relevantes ao recálculo.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a2020202-2222-4aaa-8bbb-222222222222'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_BENEFIT_AWARD_LETTER_ANALYSIS,
      creditCost: 4,
      title:
        'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DA CARTA DE CONCESSÃO',
      description:
        'Extração estruturada da carta de concessão para identificar DIB, espécie, RMI, RMA, segurado e demais dados essenciais à revisão do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a3030303-3333-4aaa-8bbb-333333333333'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_FIRST_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - PRIMEIRA ANÁLISE INTEGRADA',
      description:
        'Consolidação inicial da revisão previdenciária com resumo do cliente, análise da carta, tempo de contribuição, carência, raio-x do CNIS e principais pendências.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a4040404-4444-4aaa-8bbb-444444444444'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPARE_CNIS_CTPS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - COMPARAÇÃO CNIS E CTPS',
      description:
        'Comparação entre vínculos do CNIS e anotações da CTPS para identificar omissões, divergências e períodos com potencial de inclusão na revisão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a5050505-5555-4aaa-8bbb-555555555555'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SPECIAL_PERIOD_PPP_ANALYSIS,
      creditCost: 6,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE PPP',
      description:
        'Análise de PPP para reconhecimento de tempo especial e conversão em tempo comum no fluxo revisional da aposentadoria urbana geral.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a6060606-6666-4aaa-8bbb-666666666666'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_NO_END_DATE_DOCUMENTS_ANALYSIS,
      creditCost: 4,
      title:
        'REVISÃO APOSENTADORIA URBANA GERAL - DOCUMENTOS SEM DATA DE SAÍDA',
      description:
        'Análise de documentos comprobatórios para resolução de vínculos sem data de saída no CNIS, com definição do melhor tratamento do período.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a7070707-7777-4aaa-8bbb-777777777777'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE TEMPO RURAL',
      description:
        'Avaliação de documentação e contexto de atividade rural para aproveitamento revisional do período no benefício já concedido.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a8080808-8888-4aaa-8bbb-888888888888'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE SERVIÇO MILITAR',
      description:
        'Análise de serviço militar para cômputo em revisão de aposentadoria urbana geral, com verificação de prova e impacto no tempo total.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a9090909-9999-4aaa-8bbb-999999999999'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE DE SERVIÇO PÚBLICO',
      description:
        'Avaliação de tempo em serviço público e documentos correlatos para eventual averbação ou aproveitamento revisional no RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('aa0a0a0a-0a0a-4aaa-8bbb-0a0a0a0a0a0a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - CTPS FORA DO CNIS',
      description:
        'Análise de vínculos anotados em CTPS, mas ausentes no CNIS, para estimar viabilidade de inclusão no cálculo revisional.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ab0b0b0b-0b0b-4aaa-8bbb-0b0b0b0b0b0b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ALUNO APRENDIZ',
      description:
        'Análise de período como aluno aprendiz para verificar aproveitamento revisional e reflexos no tempo de contribuição e carência.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ac0c0c0c-0c0c-4aaa-8bbb-0c0c0c0c0c0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - TRABALHO NO EXTERIOR',
      description:
        'Análise de trabalho no exterior e documentos correspondentes para aferir possibilidade de contagem no contexto revisional.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ad0d0d0d-0d0d-4aaa-8bbb-0d0d0d0d0d0d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - TRABALHO INFORMAL',
      description:
        'Análise de trabalho informal e contribuições correlatas para medir chance de aproveitamento revisional e necessidade de complementação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ae0e0e0e-0e0e-4aaa-8bbb-0e0e0e0e0e0e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      title:
        'REVISÃO APOSENTADORIA URBANA GERAL - DECISÃO DA JUSTIÇA DO TRABALHO',
      description:
        'Análise de sentença ou acordo trabalhista para verificar seus reflexos no histórico contributivo e no recálculo do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('af0f0f0f-0f0f-4aaa-8bbb-0f0f0f0f0f0f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPLETE_ANALYSIS,
      creditCost: 6,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE COMPLETA',
      description:
        'Análise revisional completa com comparação de teses, cenários revisionais, conclusão técnica, recomendação principal e documento final.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b0101010-1010-4aaa-8bbb-101010101010'),
      resource:
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'REVISÃO APOSENTADORIA URBANA GERAL - ANÁLISE SIMPLIFICADA',
      description:
        'Versão resumida da análise revisional, com linguagem objetiva para apresentação rápida do diagnóstico e dos próximos passos.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d24bad95-ffee-4d83-a4f7-61a26f5b7936'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'DIAGNÓSTICO AUXÍLIO-ACIDENTE (RGPS) - ANÁLISE COMPLETA',
      description:
        'Análise completa do direito ao auxílio-acidente cessado com IA. Examina documentos do procedimento administrativo, CNIS, laudos médicos e histórico previdenciário para identificar irregularidades na cessação do benefício, verificar nexo causal com acidente de trabalho, calcular redução da capacidade laborativa e emitir parecer técnico conclusivo com fundamentação legal e jurisprudencial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('cb4c7a81-6d14-4558-9263-aebb87bf37ef'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'DIAGNÓSTICO AUXÍLIO-ACIDENTE (RGPS) - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do direito ao auxílio-acidente cessado com IA. Verifica os principais critérios para concessão ou restabelecimento do benefício, identifica irregularidades na cessação e apresenta de forma objetiva as possibilidades de revisão ou recurso. Versão resumida e acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('1caa4874-ca2e-4a92-a83e-613063f6ff18'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_DECISION_DETAILS,
      creditCost: 4,
      title: 'DIAGNÓSTICO AUXÍLIO-ACIDENTE (RGPS) - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da carta de cessação e documentos do processo administrativo do INSS com IA para auxílio-acidente. Examina o fundamento da cessação, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de impugnação — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('2ff58edd-7a27-4de3-8d18-4524872c05ad'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_TERMINATED_FIRST_ANALYSIS,
      creditCost: 4,
      title: 'DIAGNÓSTICO AUXÍLIO-ACIDENTE (RGPS) - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise de cessação de auxílio-acidente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão da cessação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('636d4d00-3c9c-499f-adf7-61b63d2fe430'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'AUXÍLIO-ACIDENTE (RGPS) CONCESSÃO - ANÁLISE COMPLETA',
      description:
        'Análise completa do direito à concessão de auxílio-acidente com IA. Examina documentos do caso, CNIS, laudos médicos e histórico previdenciário para verificar a presença de acidente de trabalho, o nexo causal, a redução da capacidade laborativa e os requisitos legais para concessão do benefício, emitindo parecer técnico conclusivo com fundamentação legal e jurisprudencial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4fb3901a-7495-48ce-97e2-43b402fa1111'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'AUXÍLIO-ACIDENTE (RGPS) CONCESSÃO - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada do direito à concessão de auxílio-acidente com IA. Verifica os principais critérios para concessão do benefício, identifica os pontos fortes e fracos do caso e apresenta de forma objetiva as possibilidades de êxito. Versão resumida e acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('0f6692b8-b3cb-4b94-b497-bdf7fb9a2389'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ACCIDENT_ASSISTANCE_GRANT_FIRST_ANALYSIS,
      creditCost: 4,
      title: 'AUXÍLIO-ACIDENTE (RGPS) CONCESSÃO - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise de concessão de auxílio-acidente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre a ocorrência do acidente, nexo causal, redução da capacidade laborativa, períodos relevantes e viabilidade preliminar de concessão do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b60'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'Análise de Decisão do INSS (Cessação Auxílio Incapacidade Temporária)',
      description:
        'Análise da comunicação de cessação e dos documentos do processo administrativo do INSS com IA para auxílio por incapacidade temporária. Examina o fundamento utilizado para cessar o benefício, identifica inconsistências na perícia ou no enquadramento legal, aponta irregularidades procedimentais e orienta sobre a melhor estratégia para restabelecimento administrativo ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b61'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'Primeira Análise (Cessação Auxílio Incapacidade Temporária)',
      description:
        'Primeira análise de cessação de auxílio por incapacidade temporária com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre qualidade de segurado, carência, períodos relevantes, manutenção da incapacidade e viabilidade preliminar de restabelecimento do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b62'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'Análise Completa (Cessação Auxílio Incapacidade Temporária)',
      description:
        'Análise completa de cessação de auxílio por incapacidade temporária com IA. Consolida o histórico contributivo, os períodos analisados, a decisão de cessação do INSS e a condição de incapacidade, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas de restabelecimento do benefício.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b63'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEMPORARY_DISABILITY_BENEFITS_TERMINATED_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'Análise Simplificada (Cessação Auxílio Incapacidade Temporária)',
      description:
        'Análise simplificada de cessação de auxílio por incapacidade temporária com IA. Resume os principais achados da análise completa, indica a viabilidade geral do restabelecimento do benefício, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3e4f5a6-b7d8-4c9d-8e1f-2a3b4c5d6e7f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_INSS_DECISION_ANALYSIS,
      creditCost: 3,
      title: 'BPC AO IDOSO (CESSAÇÃO) - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da decisão administrativa de cessação ou suspensão do BPC ao Idoso com IA. Extrai NB, data da decisão, motivo da cessação ou suspensão, fundamentos jurídicos utilizados pelo INSS, prazo recursal e pontos técnicos de contestação administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4f5a6b7-c8e9-4d0e-9f2a-3b4c5d6e7f8a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'BPC AO IDOSO (CESSAÇÃO) - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise técnica de cessação ou suspensão do BPC ao Idoso com IA. Cruza dados do formulário, cliente, CadÚnico, CNIS, composição familiar, renda e decisão do INSS, avaliando os critérios legais do BPC (idade e renda per capita) e a viabilidade preliminar de reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e5a6b7c8-d9f0-4e1f-aa3b-4c5d6e7f8a9b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'BPC AO IDOSO (CESSAÇÃO) - ANÁLISE COMPLETA',
      description:
        'Análise completa de cessação ou suspensão do BPC ao Idoso com IA. Examina todos os dados do caso, interpreta a decisão do INSS à luz da LOAS e regulamentações do BPC, verifica requisitos de idade e renda per capita, identifica regras aplicáveis e emite parecer técnico conclusivo com diagnóstico, cálculo de renda familiar e fundamentação jurídica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f6b7c8d9-e0a1-4f2a-bb4c-5d6e7f8a9b0c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.BPC_ELDERLY_CESSATION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'BPC AO IDOSO (CESSAÇÃO) - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de cessação ou suspensão do BPC ao Idoso com IA. Resume os principais achados da análise completa, indica a viabilidade geral da reversão, os pontos críticos (renda per capita, composição familiar, prazo recursal) e os próximos passos recomendados em linguagem acessível.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a1b2c3d4-e5f6-4a7b-9c8d-1e2f3a4b5c6d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'Análise de Decisão do INSS (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise da carta de cessação e documentos do processo administrativo do INSS com IA para aposentadoria por incapacidade permanente. Examina o fundamento da cessação, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de reversão — administrativa ou judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b2c3d4e5-f6a7-4b8c-ad9e-2f3a4b5c6d7e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'Primeira Análise (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Primeira análise de cessação de aposentadoria por incapacidade permanente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão da cessação.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c3d4e5f6-a7b8-4c9d-be1f-3a4b5c6d7e8f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
      creditCost: 8,
      title:
        'Análise Completa (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise completa de cessação de aposentadoria por incapacidade permanente com IA. Consolida o histórico contributivo, os períodos analisados, a decisão de cessação do INSS e a condição de incapacidade, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d4e5f6a7-b8c9-4d0e-8f2a-4b5c6d7e8f9a'),
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'Análise Simplificada (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise simplificada de cessação de aposentadoria por incapacidade permanente com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d51'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_FIRST_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - PRIMEIRO STEP',
      description:
        'Primeira análise do caso de indeferimento de aposentadoria do professor com IA. Combina os dados do CNIS com os dados estruturados do processo de indeferimento para gerar parecer inicial técnico sobre os períodos de magistério, carência e viabilidade de reversão do indeferimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d52'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 3,
      title:
        'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da decisão administrativa do INSS no processo de indeferimento de aposentadoria do professor. Extrai e estrutura os motivos do indeferimento, os fundamentos legais citados e as inconsistências identificadas pelo INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d53'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 8,
      title: 'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - ANÁLISE COMPLETA',
      description:
        'Análise completa do indeferimento de aposentadoria do professor com IA. Examina CNIS, documentos do processo administrativo e dados do caso para gerar parecer técnico detalhado com fundamentação legal, análise de provas de magistério, conformidade dos períodos de ensino e recomendação estratégica para recurso administrativo ou ação judicial.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d54'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title: 'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - ANÁLISE SIMPLIFICADA',
      description:
        'Geração do documento de análise simplificada do indeferimento de aposentadoria do professor, com linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d55'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_WORK_PERIOD_DOCUMENT_ANALYSIS,
      creditCost: 2,
      title:
        'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - ANÁLISE DE DOCUMENTOS DO PERÍODO',
      description:
        'Análise individual de documentos probatórios de períodos de trabalho para o caso de indeferimento de aposentadoria do professor. Identifica o tipo de documento, o nome do titular, o ano e emite nota técnica sobre a relevância probatória para comprovação de atividade de magistério.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d3e4f5-a6b7-4c8d-9e0f-1a2b3c4d5e66'),
      resource:
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_PPP_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO APOSENTADORIA DO PROFESSOR - ANÁLISE DE PPP',
      description:
        'Análise do Perfil Profissiográfico Previdenciário (PPP) para o caso de indeferimento de aposentadoria do professor. Identifica períodos de trabalho, atividades exercidas, exposição a agentes nocivos e classifica cada período para fins previdenciários.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_COMPLETE_ANALYSIS,
      creditCost: 6,
      title: 'REVISÃO APOSENTADORIA INVALIDEZ PERMANENTE - ANÁLISE COMPLETA',
      description:
        'Análise completa de revisão de aposentadoria por invalidez permanente com IA. Examina o histórico contributivo, a carta de concessão, os salários de contribuição, o cálculo da RMI/RMA, os períodos reconhecidos e os documentos do processo administrativo, gerando parecer técnico detalhado com identificação de irregularidades, fundamentação jurídica e recomendação estratégica.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title:
        'REVISÃO APOSENTADORIA INVALIDEZ PERMANENTE - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de revisão de aposentadoria por invalidez permanente com IA. Resume os principais achados, indica a viabilidade geral da revisão, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a3c4d5e6-f7a8-4b9c-8d1e-2f3a4b5c6d7e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_FIRST_ANALYSIS,
      creditCost: 4,
      title: 'REVISÃO APOSENTADORIA INVALIDEZ PERMANENTE - PRIMEIRA ANÁLISE',
      description:
        'Primeira análise de revisão de aposentadoria por invalidez permanente com IA, combinando dados do caso com leitura e interpretação do CNIS. Gera parecer inicial técnico com detalhamento da carta de concessão, tempo de contribuição, salários de contribuição não considerados e ações recomendadas.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b4d5e6f7-a8b9-4c0d-9e1f-3a4b5c6d7e8f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PERMANENT_DISABILITY_REVISION_WORK_PERIOD_NO_END_DATE_DOCUMENT_ANALYSIS,
      creditCost: 2,
      title:
        'REVISÃO APOSENTADORIA INVALIDEZ PERMANENTE - ANÁLISE DE VÍNCULO SEM DATA DE SAÍDA',
      description:
        'Análise de documentos para fechamento de vínculos empregatícios sem data de saída no contexto de revisão de Aposentadoria por Incapacidade Permanente (APIP). Examina CTPS, TRCT, FGTS e outros documentos para identificar a data de desligamento e avaliar o impacto no cálculo revisional.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ea0b1c2d-3e4f-4a5b-9c6d-7e8f9a0b1c2d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_INSS_DECISION_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO BPC AO IDOSO - ANÁLISE DA DECISÃO DO INSS',
      description:
        'Análise da decisão administrativa do INSS no indeferimento do BPC ao Idoso com IA. Extrai fundamentos da negativa, pontos técnicos vulneráveis e estratégia inicial de contestação administrativa e judicial em formato textual estruturado.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('eb1c2d3e-4f5a-4b6c-9d7e-2f5a0b1c2d3e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_COMPLETE_ANALYSIS,
      creditCost: 5,
      title: 'INDEFERIMENTO BPC AO IDOSO - ANÁLISE COMPLETA',
      description:
        'Análise completa de indeferimento do BPC ao Idoso com IA. Examina critério de idade (65 anos), renda familiar per capita, composição do grupo familiar, rendas e benefícios de cada membro, despesas dedutíveis, fundamentos da negativa e emite parecer técnico conclusivo com fundamentação legal e jurisprudencial e estratégia de reversão.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ec2d3e4f-5a6b-4c7d-ae9f-9a0b1c8d3e4f'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELDERLY_BPC_REJECTION_SIMPLIFIED_ANALYSIS,
      creditCost: 2,
      title: 'INDEFERIMENTO BPC AO IDOSO - ANÁLISE SIMPLIFICADA',
      description:
        'Análise simplificada de indeferimento do BPC ao Idoso com IA. Verifica critério de idade e renda per capita familiar, identifica o fundamento da negativa e informa de forma objetiva e acessível sobre a possibilidade de reversão do indeferimento. Versão resumida para apresentação ao cliente ou familiar.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('0adc825a-c2b8-489f-8c99-062052ea0520'),
      resource: PaymentPlanPaidResourceTypeEnum.FEE_CONTRACT_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'CONTRATO DE HONORÁRIOS - GERAÇÃO',
      description:
        'Geração automática de contrato de honorários advocatícios com IA, personalizado com os dados do cliente, cláusulas de honorários, obrigações das partes e condições de pagamento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('7e6afbb2-127f-4b6a-a55c-d8a5d15ef027'),
      resource: PaymentPlanPaidResourceTypeEnum.POWER_OF_ATTORNEY_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'PROCURAÇÃO - GERAÇÃO',
      description:
        'Geração automática de procuração ad judicia et extra com IA, personalizada com os dados do cliente, poderes específicos para atuação previdenciária e cláusulas de substabelecimento.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('62920277-3f4f-4082-a6d6-cf3309cb1ad2'),
      resource: PaymentPlanPaidResourceTypeEnum.JEF_WAIVER_DECLARATION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'DECLARAÇÃO DE RENÚNCIA AO EXCEDENTE DO JEF - GERAÇÃO',
      description:
        'Geração automática de declaração de renúncia ao excedente do valor da causa para adequação ao rito do Juizado Especial Federal (JEF), conforme Lei 10.259/2001, com dados do cliente.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('fe647a60-7453-4ddb-9ec7-f691a222948d'),
      resource: PaymentPlanPaidResourceTypeEnum.POVERTY_DECLARATION_GENERATOR_COMPLETE_ANALYSIS,
      creditCost: 2,
      title: 'DECLARAÇÃO DE HIPOSSUFICIÊNCIA - GERAÇÃO',
      description:
        'Geração automática de declaração de hipossuficiência financeira com IA para obtenção dos benefícios da justiça gratuita, personalizada com os dados do cliente conforme art. 99 do CPC.',
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
        // const entity = new PaymentPlanPaidResourceEntity({
        //   ...existing,
        //   ...resourceData,
        // });
        //
        // transactions.push(
        //   this.paymentPlanPaidResourceCommandRepositoryGateway.updatePaymentPlanPaidResource(
        //     existing.id,
        //     entity,
        //   ),
        // );

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

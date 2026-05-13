import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTeacherRetirementPlanningPrompt1785000000000
  implements MigrationInterface
{
  public readonly name = 'FixTeacherRetirementPlanningPrompt1785000000000';

  private readonly newPrompt = `Você é um especialista em planejamento previdenciário de professores no Brasil, com conhecimento profundo sobre:
- Aposentadoria Especial do Professor (redução de tempo: 25 anos mulher, 30 anos homem)
- Regras de transição da EC 103/2019
- Tempo de magistério em instituições públicas e privadas
- Impactos de vínculos concomitantes
- Estratégias de maximização de benefícios

Você receberá os dados do planejamento em JSON e, se houver, o documento CNIS do segurado em PDF.

Sua tarefa é analisar TODOS os dados e retornar um JSON estruturado conforme o schema fornecido.

**INSTRUÇÕES PARA O CAMPO "timeline":**
A timeline deve cobrir TODA a vida contributiva do segurado de forma contínua. OBRIGATÓRIO:
- Inclua um item para CADA período de vínculo ativo (magistério ou outros) encontrado no CNIS ou nos dados fornecidos
- Para CADA intervalo/lacuna entre vínculos onde não havia contribuição ativa, inclua um item com activityType: "periodo_sem_atividade"
- A timeline deve ser uma sequência cronológica sem buracos — cada período termina onde o próximo começa
- Use activityType: "atividade_professor" para magistério, "atividade_comum" para outros vínculos (CLT, servidor público, contribuinte individual etc.), "periodo_sem_atividade" para lacunas sem nenhum vínculo

**INSTRUÇÕES PARA O CAMPO "retirementRules":**
Analise todas as regras de aposentadoria de professor aplicáveis: regra geral, regras de transição da EC 103/2019 (pedágio 50%, pedágio 100%, pontos progressivos, idade mínima).

**INSTRUÇÕES PARA OS CAMPOS DE TEMPO:**
- teacherTime: tempo total exclusivamente em magistério (atividade_professor)
- commonTime: tempo em outros vínculos não-magistério (atividade_comum)
- totalContributionTime: soma total de contribuição (professor + comum, sem contar lacunas)
- publicServiceTime: tempo no serviço público (se aplicável)
- positionTenureTime: tempo no cargo atual (se aplicável)

Forneça valores precisos com base nos dados recebidos. Se o CNIS estiver disponível, extraia todos os vínculos dele para compor a timeline completa.`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`payment_plan_paid_resource_ia_config\` pppric
       INNER JOIN \`payment_plan_paid_resource\` pppr
         ON pppr.\`id\` = pppric.\`payment_plan_paid_resource_id\`
       SET pppric.\`prompt\` = ?
       WHERE pppr.\`resource\` = 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS'`,
      [this.newPrompt],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const oldPrompt = `Você é um especialista em planejamento previdenciário de professores no Brasil, com conhecimento profundo sobre:
- Aposentadoria Especial do Professor (redução de tempo: 25 anos mulher, 30 anos homem)
- Regras de transição da EC 103/2019
- Tempo de magistério em instituições públicas e privadas
- Impactos de vínculos concomitantes
- Estratégias de maximização de benefícios

**IMPORTANTE - MODO DE OPERAÇÃO:**
Se os dados recebidos estiverem em formato JSON estruturado, você deve:
1. Analisar o JSON recebido
2. Extrair todas as informações relevantes sobre períodos de magistério, vínculos, remunerações, benefícios INSS
3. Produzir uma análise técnica COMPLETA e DETALHADA em formato de texto corrido/markdown
4. Sua análise deve ser um PARECER PREVIDENCIÁRIO legível para humanos, NÃO um JSON`;

    await queryRunner.query(
      `UPDATE \`payment_plan_paid_resource_ia_config\` pppric
       INNER JOIN \`payment_plan_paid_resource\` pppr
         ON pppr.\`id\` = pppric.\`payment_plan_paid_resource_id\`
       SET pppric.\`prompt\` = ?
       WHERE pppr.\`resource\` = 'TEACHER_RETIREMENT_PLANNING_COMPLETE_ANALYSIS'`,
      [oldPrompt],
    );
  }
}

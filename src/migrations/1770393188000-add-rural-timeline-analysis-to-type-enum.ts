import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRuralTimelineAnalysisToTypeEnum1770393188000 implements MigrationInterface {
    name = 'AddRuralTimelineAnalysisToTypeEnum1770393188000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` MODIFY COLUMN \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'avaliacao_deficiencia_para_bpc', 'analise_linha_tempo_rural') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` MODIFY COLUMN \`type\` enum ('analise_rapida_cnis', 'planejamento_previdenciario_rgps', 'planejamento_aposentadoria_rpps', 'atividade_especial', 'analise_caso_judicial', 'analise_procedimento_administrativo_inss', 'gerador_perguntas_medicas', 'analise_geradora_objeção_laudo_medico_social', 'avaliacao_deficiencia_para_bpc') NOT NULL`);
    }

}

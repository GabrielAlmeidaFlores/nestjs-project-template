import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTemporaryDisabilityBenefitsGrantType1744138800000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('analysis_tool_record');

    if (!tableExists) {
      return;
    }

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente','concessao_auxilio_doenca','auxilio_incapacidade_temporaria') NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE \`analysis_tool_record\` SET \`type\` = 'auxilio_incapacidade_temporaria' WHERE \`type\` = 'concessao_auxilio_doenca'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente','auxilio_incapacidade_temporaria') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('analysis_tool_record');

    if (!tableExists) {
      return;
    }

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente','concessao_auxilio_doenca','auxilio_incapacidade_temporaria') NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE \`analysis_tool_record\` SET \`type\` = 'concessao_auxilio_doenca' WHERE \`type\` = 'auxilio_incapacidade_temporaria'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`analysis_tool_record\` CHANGE \`type\` \`type\` enum('analise_rapida_cnis','planejamento_previdenciario_rgps','planejamento_aposentadoria_rpps','planejamento_previdenciario_professor','atividade_especial','analise_caso_judicial','analise_procedimento_administrativo_inss','gerador_perguntas_medicas','analise_geradora_objeção_laudo_medico_social','gerador_discurso','avaliacao_deficiencia_para_bpc','analise_renda_per_capita_para_bpc','analise_linha_tempo_rural','gerador_perguntas_audiencia','analise_qualidade_segurado','planejamento_aposentadoria_para_deficiente','concessao_aposentadoria_urbana_geral','analise_aposentadoria_urbana_geral','aposentadoria_categoria_especial','concessao_aposentadoria_para_deficiente','concessao_auxilio_doenca') NOT NULL`,
    );
  }
}

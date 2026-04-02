import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSupportTicketStatusEnum1774900000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` MODIFY \`status\` enum('Andamento','Resolvido','Aguardando resposta','awaiting_response','in_progress','resolved') NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'awaiting_response' WHERE \`status\` = 'Aguardando resposta'`,
    );
    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'in_progress' WHERE \`status\` = 'Andamento'`,
    );
    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'resolved' WHERE \`status\` = 'Resolvido'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` MODIFY \`status\` enum('awaiting_response','in_progress','resolved') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` MODIFY \`status\` enum('awaiting_response','in_progress','resolved','Andamento','Resolvido','Aguardando resposta') NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'Aguardando resposta' WHERE \`status\` = 'awaiting_response'`,
    );
    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'Andamento' WHERE \`status\` = 'in_progress'`,
    );
    await queryRunner.query(
      `UPDATE \`support_ticket\` SET \`status\` = 'Resolvido' WHERE \`status\` = 'resolved'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`support_ticket\` MODIFY \`status\` enum('Andamento','Resolvido','Aguardando resposta') NOT NULL`,
    );
  }
}

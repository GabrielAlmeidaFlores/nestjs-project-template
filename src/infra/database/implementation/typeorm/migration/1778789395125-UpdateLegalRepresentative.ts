import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLegalRepresentative1778789395125 implements MigrationInterface {
    name = 'UpdateLegalRepresentative1778789395125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bpc_disability_grant_legal_representative_of_a_minor\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NULL, \`federal_document\` varchar(255) NULL, \`birth_date\` date NULL, \`minor_under_custody\` tinyint NULL, \`kinship\` enum ('irmão_ou_irma', 'pai_ou_mae', 'other') NULL, \`_bpc_disability_grant_id\` varchar(36) NULL, UNIQUE INDEX \`REL_ccbdcff79d48dc86278c62526a\` (\`_bpc_disability_grant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` DROP COLUMN \`temporary_incapacity_benefit_termination_id\``);
        await queryRunner.query(`ALTER TABLE \`bpc_disability_grant_legal_representative_of_a_minor\` ADD CONSTRAINT \`FK_ccbdcff79d48dc86278c62526a8\` FOREIGN KEY (\`_bpc_disability_grant_id\`) REFERENCES \`bpc_disability_grant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bpc_disability_grant_legal_representative_of_a_minor\` DROP FOREIGN KEY \`FK_ccbdcff79d48dc86278c62526a8\``);
        await queryRunner.query(`ALTER TABLE \`analysis_tool_record\` ADD \`temporary_incapacity_benefit_termination_id\` varchar(36) NULL`);
        await queryRunner.query(`DROP INDEX \`REL_ccbdcff79d48dc86278c62526a\` ON \`bpc_disability_grant_legal_representative_of_a_minor\``);
        await queryRunner.query(`DROP TABLE \`bpc_disability_grant_legal_representative_of_a_minor\``);
    }

}

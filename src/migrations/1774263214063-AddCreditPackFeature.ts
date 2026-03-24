import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreditPackFeature1774263214063 implements MigrationInterface {
    name = 'AddCreditPackFeature1774263214063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`credit_pack\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`price\` decimal(10,2) NOT NULL, \`credit_amount\` int NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organization_credit_pack_purchase\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`credit_amount\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`organization_id\` varchar(36) NULL, \`credit_pack_id\` varchar(36) NULL, \`bank_payment_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_b1b7c551fbf2de09bfe4f32e8aa\` FOREIGN KEY (\`organization_id\`) REFERENCES \`organization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_d9a5bfe7715c71666f04a70b3bb\` FOREIGN KEY (\`credit_pack_id\`) REFERENCES \`credit_pack\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` ADD CONSTRAINT \`FK_c3ffb9efe979a695e45da4f073c\` FOREIGN KEY (\`bank_payment_id\`) REFERENCES \`bank_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_c3ffb9efe979a695e45da4f073c\``);
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_d9a5bfe7715c71666f04a70b3bb\``);
        await queryRunner.query(`ALTER TABLE \`organization_credit_pack_purchase\` DROP FOREIGN KEY \`FK_b1b7c551fbf2de09bfe4f32e8aa\``);
        await queryRunner.query(`DROP TABLE \`organization_credit_pack_purchase\``);
        await queryRunner.query(`DROP TABLE \`credit_pack\``);
    }

}

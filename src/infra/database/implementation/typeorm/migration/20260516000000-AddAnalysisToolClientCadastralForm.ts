import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class AddAnalysisToolClientCadastralForm20260516000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'analysis_tool_client_cadastral_form',
        columns: [
          { name: 'id', type: 'char', length: '36', isPrimary: true },
          { name: 'analysis_tool_client_id', type: 'char', length: '36', isNullable: false },
          { name: 'rg', type: 'varchar', length: '50', isNullable: true },
          { name: 'nit', type: 'varchar', length: '50', isNullable: true },
          { name: 'occupation', type: 'varchar', length: '255', isNullable: true },
          { name: 'marital_status', type: 'varchar', length: '100', isNullable: true },
          { name: 'neighborhood', type: 'varchar', length: '255', isNullable: true },
          { name: 'street', type: 'varchar', length: '255', isNullable: true },
          { name: 'address_number', type: 'varchar', length: '50', isNullable: true },
          { name: 'mother_name', type: 'varchar', length: '255', isNullable: true },
          { name: 'father_name', type: 'varchar', length: '255', isNullable: true },
          { name: 'spouse_name', type: 'varchar', length: '255', isNullable: true },
          { name: 'ctps_number', type: 'varchar', length: '100', isNullable: true },
          { name: 'own_house', type: 'boolean', isNullable: true },
          { name: 'has_children', type: 'boolean', isNullable: true },
          { name: 'children_names', type: 'text', isNullable: true },
          { name: 'is_retired', type: 'boolean', isNullable: true },
          { name: 'retirement_type', type: 'varchar', length: '100', isNullable: true },
          { name: 'retirement_benefit_number', type: 'varchar', length: '100', isNullable: true },
          { name: 'receives_social_security_benefit', type: 'boolean', isNullable: true },
          { name: 'social_security_benefit_type', type: 'varchar', length: '100', isNullable: true },
          { name: 'social_security_benefit_number', type: 'varchar', length: '100', isNullable: true },
          { name: 'receives_welfare_benefit', type: 'boolean', isNullable: true },
          { name: 'welfare_benefit_type', type: 'varchar', length: '100', isNullable: true },
          { name: 'welfare_benefit_number', type: 'varchar', length: '100', isNullable: true },
          { name: 'has_inss_debt', type: 'boolean', isNullable: true },
          { name: 'inss_debt_amount', type: 'varchar', length: '100', isNullable: true },
          { name: 'receives_bolsa_familia', type: 'boolean', isNullable: true },
          { name: 'worked_in_special_activity', type: 'boolean', isNullable: true },
          { name: 'special_activity_agent', type: 'varchar', length: '255', isNullable: true },
          { name: 'has_ppp_or_ltcat', type: 'boolean', isNullable: true },
          { name: 'ppp_ltcat_company', type: 'varchar', length: '255', isNullable: true },
          { name: 'company_is_open', type: 'boolean', isNullable: true },
          { name: 'worked_with_electricity', type: 'boolean', isNullable: true },
          { name: 'worked_as_security', type: 'boolean', isNullable: true },
          { name: 'exposed_to_excessive_noise', type: 'boolean', isNullable: true },
          { name: 'worked_in_rural_area', type: 'boolean', isNullable: true },
          { name: 'family_lived_in_rural_area', type: 'boolean', isNullable: true },
          { name: 'worked_in_public_service', type: 'boolean', isNullable: true },
          { name: 'held_public_job', type: 'boolean', isNullable: true },
          { name: 'hired_by_municipality', type: 'boolean', isNullable: true },
          { name: 'hospitalization_details', type: 'text', isNullable: true },
          { name: 'health_problems', type: 'text', isNullable: true },
          { name: 'accident_details', type: 'text', isNullable: true },
          { name: 'work_accident_details', type: 'text', isNullable: true },
          { name: 'medical_treatment', type: 'text', isNullable: true },
          { name: 'continuous_medication', type: 'text', isNullable: true },
          { name: 'uses_farmacia_popular', type: 'boolean', isNullable: true },
          { name: 'medical_attendance_type', type: 'varchar', length: '50', isNullable: true },
          { name: 'doctor_name', type: 'varchar', length: '255', isNullable: true },
          { name: 'medical_location', type: 'varchar', length: '255', isNullable: true },
          { name: 'has_laboratory_tests', type: 'boolean', isNullable: true },
          { name: 'has_medical_certificates', type: 'boolean', isNullable: true },
          { name: 'accident_sequelae', type: 'text', isNullable: true },
          { name: 'pending_administrative_request', type: 'text', isNullable: true },
          { name: 'ongoing_judicial_process', type: 'text', isNullable: true },
          { name: 'closed_judicial_process', type: 'text', isNullable: true },
          { name: 'previous_benefit_revision', type: 'text', isNullable: true },
          { name: 'doc_id_and_residence', type: 'boolean', isNullable: true },
          { name: 'doc_pap_and_judicial', type: 'boolean', isNullable: true },
          { name: 'doc_cnis_extract', type: 'boolean', isNullable: true },
          { name: 'doc_ppp_ltcat', type: 'boolean', isNullable: true },
          { name: 'doc_reservist_certificate', type: 'boolean', isNullable: true },
          { name: 'doc_rural_documents', type: 'boolean', isNullable: true },
          { name: 'doc_all_ctps', type: 'boolean', isNullable: true },
          { name: 'doc_public_admin_contracts', type: 'boolean', isNullable: true },
          { name: 'doc_others', type: 'text', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'analysis_tool_client_cadastral_form',
      new TableForeignKey({
        columnNames: ['analysis_tool_client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analysis_tool_client',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'analysis_tool_client_cadastral_form',
      new TableIndex({
        name: 'IDX_analysis_tool_client_cadastral_form_client_id',
        columnNames: ['analysis_tool_client_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('analysis_tool_client_cadastral_form', true);
  }
}

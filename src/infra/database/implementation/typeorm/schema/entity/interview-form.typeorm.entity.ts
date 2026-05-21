import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';

@Entity({ name: 'interview_form' })
export class InterviewFormTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => AnalysisToolClientTypeormEntity)
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  // Dados do Cliente
  @Column({ name: 'client_name', type: 'varchar', length: 255, nullable: true })
  public clientName: string | null;

  @Column({ name: 'client_cpf', type: 'varchar', length: 50, nullable: true })
  public clientCpf: string | null;

  @Column({ name: 'client_rg', type: 'varchar', length: 50, nullable: true })
  public clientRg: string | null;

  @Column({
    name: 'client_inss_password',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public clientInssPassword: string | null;

  @Column({
    name: 'client_address',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public clientAddress: string | null;

  @Column({
    name: 'client_profession',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientProfession: string | null;

  @Column({ name: 'client_nit', type: 'varchar', length: 50, nullable: true })
  public clientNit: string | null;

  @Column({
    name: 'client_ctps_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public clientCtpsNumber: string | null;

  @Column({
    name: 'client_birth_date',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public clientBirthDate: string | null;

  @Column({
    name: 'client_marital_status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public clientMaritalStatus: string | null;

  @Column({ name: 'client_race', type: 'varchar', length: 50, nullable: true })
  public clientRace: string | null;

  @Column({
    name: 'client_phone_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public clientPhoneNumber: string | null;

  @Column({
    name: 'client_mother_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientMotherName: string | null;

  @Column({
    name: 'client_father_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientFatherName: string | null;

  @Column({
    name: 'client_spouse_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientSpouseName: string | null;

  @Column({
    name: 'client_email',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public clientEmail: string | null;

  @Column({ name: 'client_ctps', type: 'varchar', length: 50, nullable: true })
  public clientCtps: string | null;

  @Column({ name: 'client_has_disclosure', type: 'boolean', nullable: true })
  public clientHasDisclosure: boolean | null;

  @Column({ name: 'client_has_rpc', type: 'boolean', nullable: true })
  public clientHasRpc: boolean | null;

  @Column({
    name: 'client_registration_date',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public clientRegistrationDate: string | null;

  @Column({ name: 'client_age', type: 'varchar', length: 20, nullable: true })
  public clientAge: string | null;

  @Column({
    name: 'client_neighborhood',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientNeighborhood: string | null;

  @Column({
    name: 'client_street',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientStreet: string | null;

  @Column({
    name: 'client_street_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public clientStreetNumber: string | null;

  @Column({
    name: 'client_is_married_or_in_union',
    type: 'boolean',
    nullable: true,
  })
  public clientIsMarriedOrInUnion: boolean | null;

  @Column({ name: 'client_has_children', type: 'boolean', nullable: true })
  public clientHasChildren: boolean | null;

  @Column({ name: 'children_names', type: 'simple-array', nullable: true })
  public childrenNames: string[] | null;

  // Dados Laborativos e Previdenciários
  @Column({ name: 'is_retired', type: 'boolean', nullable: true })
  public isRetired: boolean | null;

  @Column({
    name: 'has_received_or_receives_social_security_benefit',
    type: 'boolean',
    nullable: true,
  })
  public hasReceivedOrReceivesSocialSecurityBenefit: boolean | null;

  @Column({
    name: 'has_received_or_receives_welfare_benefit',
    type: 'boolean',
    nullable: true,
  })
  public hasReceivedOrReceivesWelfareBenefit: boolean | null;

  @Column({
    name: 'social_security_benefit_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public socialSecurityBenefitType: string | null;

  @Column({
    name: 'social_security_benefit_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public socialSecurityBenefitNumber: string | null;

  @Column({
    name: 'welfare_benefit_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public welfareBenefitNumber: string | null;

  @Column({
    name: 'desired_benefit_type',
    type: 'simple-enum',
    enum: InterviewFormBenefitTypeEnum,
    nullable: true,
  })
  public desiredBenefitType: InterviewFormBenefitTypeEnum | null;

  @Column({ name: 'has_social_security_debt', type: 'boolean', nullable: true })
  public hasSocialSecurityDebt: boolean | null;

  @Column({
    name: 'social_security_debt_date',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public socialSecurityDebtDate: string | null;

  @Column({
    name: 'social_security_debt_amount',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public socialSecurityDebtAmount: string | null;

  @Column({ name: 'receives_bolsa_familia', type: 'boolean', nullable: true })
  public receivesBolsaFamilia: boolean | null;

  // Atividades Especiais
  @Column({
    name: 'has_worked_in_special_activities',
    type: 'boolean',
    nullable: true,
  })
  public hasWorkedInSpecialActivities: boolean | null;

  @Column({
    name: 'special_activity_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public specialActivityType: string | null;

  @Column({
    name: 'special_activity_agent',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public specialActivityAgent: string | null;

  @Column({ name: 'has_ppp_or_ltcat', type: 'boolean', nullable: true })
  public hasPppOrLtcat: boolean | null;

  @Column({
    name: 'ppp_or_ltcat_details',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public pppOrLtcatDetails: string | null;

  @Column({
    name: 'is_company_open_or_closed',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public isCompanyOpenOrClosed: string | null;

  @Column({
    name: 'company_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public companyName: string | null;

  @Column({
    name: 'has_worked_with_electricity',
    type: 'boolean',
    nullable: true,
  })
  public hasWorkedWithElectricity: boolean | null;

  @Column({ name: 'has_worked_as_vigilante', type: 'boolean', nullable: true })
  public hasWorkedAsVigilante: boolean | null;

  @Column({
    name: 'has_worked_exposed_to_excessive_noise',
    type: 'boolean',
    nullable: true,
  })
  public hasWorkedExposedToExcessiveNoise: boolean | null;

  // Trabalho Rural
  @Column({ name: 'has_worked_in_rural_area', type: 'boolean', nullable: true })
  public hasWorkedInRuralArea: boolean | null;

  @Column({
    name: 'family_lived_in_rural_area_during_childhood',
    type: 'boolean',
    nullable: true,
  })
  public familyLivedInRuralAreaDuringChildhood: boolean | null;

  // Serviço Público
  @Column({
    name: 'has_worked_in_public_service',
    type: 'boolean',
    nullable: true,
  })
  public hasWorkedInPublicService: boolean | null;

  @Column({ name: 'has_held_public_office', type: 'boolean', nullable: true })
  public hasHeldPublicOffice: boolean | null;

  @Column({
    name: 'has_been_commissioned_by_public_administration',
    type: 'boolean',
    nullable: true,
  })
  public hasBeenCommissionedByPublicAdministration: boolean | null;

  // Dados de Saúde Ocupacional
  @Column({ name: 'has_been_hospitalized', type: 'text', nullable: true })
  public hasBeenHospitalized: string | null;

  @Column({ name: 'has_health_problems', type: 'text', nullable: true })
  public hasHealthProblems: string | null;

  @Column({ name: 'has_had_accident', type: 'text', nullable: true })
  public hasHadAccident: string | null;

  @Column({ name: 'has_had_work_accident', type: 'text', nullable: true })
  public hasHadWorkAccident: string | null;

  @Column({ name: 'has_medical_treatment', type: 'text', nullable: true })
  public hasMedicalTreatment: string | null;

  @Column({ name: 'takes_continuous_medication', type: 'text', nullable: true })
  public takesContinuousMedication: string | null;

  @Column({
    name: 'buys_medication_from_popular_pharmacy',
    type: 'boolean',
    nullable: true,
  })
  public buysMedicationFromPopularPharmacy: boolean | null;

  @Column({
    name: 'medical_service_type',
    type: 'simple-enum',
    enum: InterviewFormMedicalServiceTypeEnum,
    nullable: true,
  })
  public medicalServiceType: InterviewFormMedicalServiceTypeEnum | null;

  @Column({
    name: 'attending_doctor_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public attendingDoctorName: string | null;

  @Column({
    name: 'treatment_location',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public treatmentLocation: string | null;

  @Column({ name: 'has_lab_reports', type: 'boolean', nullable: true })
  public hasLabReports: boolean | null;

  @Column({ name: 'has_medical_records', type: 'boolean', nullable: true })
  public hasMedicalRecords: boolean | null;

  @Column({ name: 'has_accident_report', type: 'text', nullable: true })
  public hasAccidentReport: string | null;

  // Histórico Processual
  @Column({
    name: 'has_administrative_claim_with_inss',
    type: 'text',
    nullable: true,
  })
  public hasAdministrativeClaimWithInss: string | null;

  @Column({ name: 'has_ongoing_lawsuit', type: 'text', nullable: true })
  public hasOngoingLawsuit: string | null;

  @Column({ name: 'has_previous_lawsuit', type: 'text', nullable: true })
  public hasPreviousLawsuit: string | null;

  @Column({
    name: 'has_requested_administrative_or_judicial_review',
    type: 'text',
    nullable: true,
  })
  public hasRequestedAdministrativeOrJudicialReview: string | null;

  // Documentos Entregues
  @Column({
    name: 'has_rg_cpf_proof_of_residence',
    type: 'boolean',
    nullable: true,
  })
  public hasRgCpfProofOfResidence: boolean | null;

  @Column({
    name: 'has_pap_and_judicial_process_copy',
    type: 'boolean',
    nullable: true,
  })
  public hasPapAndJudicialProcessCopy: boolean | null;

  @Column({ name: 'has_cnis_extract', type: 'boolean', nullable: true })
  public hasCnisExtract: boolean | null;

  @Column({ name: 'has_ppp_and_ltcat', type: 'boolean', nullable: true })
  public hasPppAndLtcat: boolean | null;

  @Column({
    name: 'has_reservist_certificate',
    type: 'boolean',
    nullable: true,
  })
  public hasReservistCertificate: boolean | null;

  @Column({ name: 'has_rural_documents', type: 'boolean', nullable: true })
  public hasRuralDocuments: boolean | null;

  @Column({ name: 'has_complete_ctps_copy', type: 'boolean', nullable: true })
  public hasCompleteCtpsCopy: boolean | null;

  @Column({
    name: 'has_public_administration_work_contract',
    type: 'boolean',
    nullable: true,
  })
  public hasPublicAdministrationWorkContract: boolean | null;

  @Column({ name: 'has_other_documents', type: 'boolean', nullable: true })
  public hasOtherDocuments: boolean | null;

  @Column({ name: 'other_documents_description', type: 'text', nullable: true })
  public otherDocumentsDescription: string | null;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = InterviewFormTypeormEntity.name;
}

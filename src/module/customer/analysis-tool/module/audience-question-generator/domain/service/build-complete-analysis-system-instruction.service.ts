/**
 * Monta o system instruction para análise completa do gerador de perguntas de audiência,
 * incluindo a data atual exigida pela regra de negócio deste fluxo.
 */
export function buildCompleteAnalysisSystemInstruction(
  basePrompt: string,
  currentDate: Date,
): string {
  return `${basePrompt}\nuse the current date: ${currentDate.toISOString()}`;
}

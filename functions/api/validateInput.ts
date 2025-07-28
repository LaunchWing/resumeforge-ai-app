export function validateInput(body: any): boolean {
  const { careerField, keySkills, experienceLevel, jobTarget } = body;
  return Boolean(careerField && keySkills && experienceLevel && jobTarget && Array.isArray(keySkills));
}
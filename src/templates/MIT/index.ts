import { DEFAULT_TEMPLATE } from '../default';
import profile from './structure/profile';
import experience from './structure/experience';
import education from './structure/education';
import project from './structure/project';
import skills from './structure/skills';
import custom from './structure/custom';
import certification from './structure/certification';
import language from './structure/language';
import award from './structure/award';
import volunteer from './structure/volunteer';
import publication from './structure/publication';

const MIT_TEMPLATES: Record<string, any> = {
  profile,
  experience,
  education,
  project,
  skills,
  custom,
  certification,
  language,
  award,
  volunteer,
  publication
};

export function getMITTemplate(type: string) {
  return MIT_TEMPLATES[type] || DEFAULT_TEMPLATE;
}

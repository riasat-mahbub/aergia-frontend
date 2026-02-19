import {
  ResumeForm,
  ResumeProfile,
  ResumeExperience,
  ResumeEducation,
  ResumeProject,
  ResumeSkills,
  ResumeCustom,
  ResumeCertification,
  ResumeLanguage,
  ResumeAward,
  ResumeVolunteer,
  ResumePublication,
} from '@/types/ResumeFormTypes';
import {
  createForm,
  emptyProfile,
  emptyExperience,
  emptyEducation,
  emptyProject,
  emptySkills,
  emptyCustom,
  emptyCertification,
  emptyLanguage,
  emptyAward,
  emptyVolunteer,
  emptyPublication,
} from '@/constants/resumeFormTemplates';

export function getEntryDisplayTitle(entry: ResumeForm): string {
  switch (entry.type) {
    case 'profile':
      return (entry as ResumeProfile).name || 'Profile';
    case 'experience':
      return (entry as ResumeExperience).jobTitle || (entry as ResumeExperience).company || 'Experience';
    case 'education':
      return (entry as ResumeEducation).school || (entry as ResumeEducation).degree || 'Education';
    case 'skills':
      return (entry as ResumeSkills).category || 'Skills';
    case 'project':
      return (entry as ResumeProject).project || (entry as ResumeProject).role || 'Project';
    case 'custom':
      return (entry as ResumeCustom).title || (entry as ResumeCustom).subtitle || 'Custom';
    case 'certification':
      return (entry as ResumeCertification).name || (entry as ResumeCertification).issuingOrganization || 'Certification';
    case 'language':
      return (entry as ResumeLanguage).language || 'Language';
    case 'award':
      return (entry as ResumeAward).title || (entry as ResumeAward).issuer || 'Award';
    case 'volunteer':
      return (entry as ResumeVolunteer).organization || (entry as ResumeVolunteer).role || 'Volunteer';
    case 'publication':
      return (entry as ResumePublication).title || (entry as ResumePublication).publisher || 'Publication';
    default:
      return 'Entry';
  }
}

export function getEntrySubtitle(entry: ResumeForm): string {
  switch (entry.type) {
    case 'profile': {
      const profile = entry as ResumeProfile;
      return profile.summary ? profile.summary.substring(0, 50) + '...' : '';
    }
    case 'experience':
      return (entry as ResumeExperience).company || '';
    case 'education':
      return (entry as ResumeEducation).degree || (entry as ResumeEducation).fieldOfStudy || '';
    case 'skills': {
      const skills = entry as ResumeSkills;
      return skills.skills.length > 0 ? skills.skills.slice(0, 3).join(', ') + (skills.skills.length > 3 ? '...' : '') : '';
    }
    case 'project':
      return (entry as ResumeProject).role || (entry as ResumeProject).subtitle || '';
    case 'custom':
      return (entry as ResumeCustom).subtitle || '';
    case 'certification':
      return (entry as ResumeCertification).issuingOrganization || '';
    case 'language':
      return (entry as ResumeLanguage).proficiency || '';
    case 'award':
      return (entry as ResumeAward).issuer || '';
    case 'volunteer':
      return (entry as ResumeVolunteer).role || '';
    case 'publication':
      return (entry as ResumePublication).publisher || '';
    default:
      return '';
  }
}

export function getEmptyFormByType(type: string): ResumeForm {
  switch (type) {
    case 'profile':
      return createForm(emptyProfile);
    case 'experience':
      return createForm(emptyExperience);
    case 'education':
      return createForm(emptyEducation);
    case 'skills':
      return createForm(emptySkills);
    case 'project':
      return createForm(emptyProject);
    case 'custom':
      return createForm(emptyCustom);
    case 'certification':
      return createForm(emptyCertification);
    case 'language':
      return createForm(emptyLanguage);
    case 'award':
      return createForm(emptyAward);
    case 'volunteer':
      return createForm(emptyVolunteer);
    case 'publication':
      return createForm(emptyPublication);
    default:
      return createForm(emptyCustom);
  }
}

export function getFormTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    profile: 'Profile',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    project: 'Project',
    custom: 'Custom',
    certification: 'Certification',
    language: 'Language',
    award: 'Award',
    volunteer: 'Volunteer',
    publication: 'Publication',
  };
  return labels[type] || 'Section';
}

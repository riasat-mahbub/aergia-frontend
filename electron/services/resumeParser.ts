import { v4 as uuidv4 } from 'uuid';
import { ParsedResume, ParsedExperience, ParsedEducation, ParsedSkill, ParsedCertification } from './pdfParser.js';

// Type definitions for ResumeForms (matching frontend structure)
interface ProfileItem {
  title: string;
  order: number;
  icon: string;
  type: string;
}

interface ResumeURL extends ProfileItem {
  url: string;
}

interface ResumeProfile {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  name: string;
  infos: ProfileItem[];
  urls: ResumeURL[];
  summary: string;
}

interface ResumeExperience {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  company: string;
  jobTitle: string;
  employmentType: string;
  isCurrentRole: boolean;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface ResumeEducation {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  school: string;
  degree: string;
  fieldOfStudy: string;
  isCurrentlyStudying: boolean;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  honors: string[];
  description: string;
}

interface ResumeSkills {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  category: string;
  skills: string[];
  description: string;
}

interface ResumeCertification {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  name: string;
  issuingOrganization: string;
  credentialUrl: string;
  issueDate: string;
  expirationDate: string;
  doesNotExpire: boolean;
  credentialId: string;
}

interface ResumeCustom {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export class ResumeParserService {
  static createProfileForm(parsed: ParsedResume['profile']): ResumeProfile {
    const infos: ProfileItem[] = [];
    const urls: ResumeURL[] = [];
    let order = 0;
    
    if (parsed?.email) {
      infos.push({
        title: parsed.email,
        order: order++,
        icon: 'email',
        type: 'email'
      });
    }
    
    if (parsed?.phone) {
      infos.push({
        title: parsed.phone,
        order: order++,
        icon: 'phone',
        type: 'phone'
      });
    }
    
    if (parsed?.linkedIn) {
      urls.push({
        title: 'LinkedIn',
        url: parsed.linkedIn,
        order: order++,
        icon: 'linkedin',
        type: 'url'
      });
    }
    
    return {
      id: uuidv4(),
      type: 'profile',
      title: 'Profile',
      visible: true,
      name: parsed?.name || '',
      infos,
      urls,
      summary: parsed?.summary || ''
    };
  }
  
  static createExperienceForms(experiences: ParsedExperience[] | undefined): ResumeExperience[] {
    if (!experiences || experiences.length === 0) return [];
    
    return experiences.map(exp => ({
      id: uuidv4(),
      type: 'experience',
      title: exp.jobTitle || 'Experience',
      visible: true,
      company: exp.company || '',
      jobTitle: exp.jobTitle || '',
      employmentType: '',
      isCurrentRole: exp.isCurrentRole || false,
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      location: exp.location || '',
      description: exp.description || '',
      technologies: [],
      achievements: []
    }));
  }
  
  static createEducationForms(educations: ParsedEducation[] | undefined): ResumeEducation[] {
    if (!educations || educations.length === 0) return [];
    
    return educations.map(edu => ({
      id: uuidv4(),
      type: 'education',
      title: edu.school || 'Education',
      visible: true,
      school: edu.school || '',
      degree: edu.degree || '',
      fieldOfStudy: edu.fieldOfStudy || '',
      isCurrentlyStudying: false,
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      gpa: edu.gpa || '',
      location: '',
      honors: [],
      description: ''
    }));
  }
  
  static createSkillsForms(skills: ParsedSkill[] | undefined): ResumeSkills[] {
    if (!skills || skills.length === 0) return [];
    
    return skills.map(skill => ({
      id: uuidv4(),
      type: 'skills',
      title: skill.category || 'Skills',
      visible: true,
      category: skill.category || 'Skills',
      skills: skill.skills || [],
      description: ''
    }));
  }
  
  static createCertificationForms(certifications: ParsedCertification[] | undefined): ResumeCertification[] {
    if (!certifications || certifications.length === 0) return [];
    
    return certifications.map(cert => ({
      id: uuidv4(),
      type: 'certification',
      title: cert.name || 'Certification',
      visible: true,
      name: cert.name || '',
      issuingOrganization: cert.issuingOrganization || '',
      credentialUrl: '',
      issueDate: cert.issueDate || '',
      expirationDate: '',
      doesNotExpire: true,
      credentialId: ''
    }));
  }
  
  static createCustomForm(rawText: string): ResumeCustom {
    return {
      id: uuidv4(),
      type: 'custom',
      title: 'Additional Information',
      visible: true,
      subtitle: '',
      startDate: '',
      endDate: '',
      location: '',
      description: rawText
    };
  }
}

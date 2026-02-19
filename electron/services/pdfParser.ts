import { PDFParse } from 'pdf-parse';

export interface ParsedExperience {
  company: string;
  jobTitle: string;
  startDate?: string;
  endDate?: string;
  isCurrentRole?: boolean;
  location?: string;
  description?: string;
}

export interface ParsedEducation {
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface ParsedSkill {
  category?: string;
  skills: string[];
}

export interface ParsedCertification {
  name: string;
  issuingOrganization?: string;
  issueDate?: string;
}

export interface ParsedResume {
  profile?: {
    name?: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
    summary?: string;
  };
  experience?: ParsedExperience[];
  education?: ParsedEducation[];
  skills?: ParsedSkill[];
  certifications?: ParsedCertification[];
  rawText: string;
}

export class PdfParserService {
  static async parsePdf(buffer: Buffer): Promise<ParsedResume> {
    try {
      const pdfParse = new PDFParse({ data: buffer });
      const textResult = await pdfParse.getText();
      const text = textResult.text || '';
      
      return {
        profile: this.extractProfile(text),
        experience: this.extractExperience(text),
        education: this.extractEducation(text),
        skills: this.extractSkills(text),
        certifications: this.extractCertifications(text),
        rawText: text
      };
    } catch (error) {
      console.error('Failed to parse PDF:', error);
      throw new Error('Failed to parse PDF file');
    }
  }
  
  private static extractProfile(text: string): ParsedResume['profile'] {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return undefined;
    
    const profile: ParsedResume['profile'] = {};
    
    // Name is usually in the first few lines
    // Look for a line that looks like a name (2-3 words, capitalized)
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i];
      // Skip lines that are clearly not names
      if (line.includes('@') || line.match(/^\d/) || line.length > 50) continue;
      
      // Check if it looks like a name (2-4 capitalized words)
      const words = line.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        const isName = words.every(w => w[0] === w[0]?.toUpperCase());
        if (isName && !profile.name) {
          profile.name = line;
          break;
        }
      }
    }
    
    // Extract email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      profile.email = emailMatch[0];
    }
    
    // Extract phone
    const phoneMatch = text.match(/[\+\(]?[1-9]\d{0,2}[\)\s.-]?\d{3}[\s.-]?\d{4}/);
    if (phoneMatch) {
      profile.phone = phoneMatch[0];
    }
    
    // Extract LinkedIn
    const linkedInMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedInMatch) {
      profile.linkedIn = `https://${linkedInMatch[0]}`;
    }
    
    // Extract summary (paragraph after contact info, before first section)
    const sectionHeaders = ['experience', 'education', 'skills', 'certifications', 'projects'];
    const summaryMatch = text.match(/(?:^|\n)([\w\s.,]+)(?=\n\s*(?:experience|education|skills|work|professional))/i);
    if (summaryMatch && summaryMatch[1].length > 50) {
      profile.summary = summaryMatch[1].trim();
    }
    
    return profile;
  }
  
  private static extractExperience(text: string): ParsedExperience[] {
    const experiences: ParsedExperience[] = [];
    
    // Find experience section
    const expMatch = text.match(/(?:experience|work experience|professional experience|employment history)([:\n]+)([\s\S]*?)(?=\n\s*(?:education|skills|certifications|projects|languages|references|interests|$))/i);
    if (!expMatch) return experiences;
    
    const expSection = expMatch[2];
    
    // Split into individual entries
    // Look for patterns: Company Name, Job Title, Date Range
    const entries = expSection.split(/\n(?=[A-Z][\w\s&.,]+\n)/);
    
    for (const entry of entries) {
      const lines = entry.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length < 2) continue;
      
      const exp: ParsedExperience = {
        company: lines[0],
        jobTitle: lines[1]
      };
      
      // Look for dates in any line
      for (const line of lines) {
        // Date patterns: Jan 2020 - Dec 2021, 2020-2021, Present
        const dateMatch = line.match(/((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+)?(\d{4})\s*[-–—]\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+)?(\d{4}|present)/i);
        if (dateMatch) {
          exp.startDate = dateMatch[2];
          exp.endDate = dateMatch[4]?.toLowerCase() === 'present' ? undefined : dateMatch[4];
          exp.isCurrentRole = !exp.endDate || exp.endDate.toLowerCase() === 'present';
        }
        
        // Location pattern: City, State or City, Country
        const locationMatch = line.match(/^([A-Z][\w\s]+),\s*([A-Z]{2}|[A-Z][a-z]+)$/);
        if (locationMatch) {
          exp.location = line;
        }
      }
      
      // Description is remaining text
      const descriptionLines = lines.slice(2).filter(l => 
        !l.match(/\d{4}/) && 
        !l.match(/^[A-Z][\w\s]+,/) &&
        l.length > 10
      );
      if (descriptionLines.length > 0) {
        exp.description = descriptionLines.join('\n');
      }
      
      experiences.push(exp);
    }
    
    return experiences;
  }
  
  private static extractEducation(text: string): ParsedEducation[] {
    const educations: ParsedEducation[] = [];
    
    // Find education section
    const eduMatch = text.match(/(?:education|academic background|academic qualifications)([:\n]+)([\s\S]*?)(?=\n\s*(?:experience|skills|certifications|projects|languages|references|interests|$))/i);
    if (!eduMatch) return educations;
    
    const eduSection = eduMatch[2];
    const entries = eduSection.split(/\n(?=[A-Z][\w\s&.,]+\n)/);
    
    for (const entry of entries) {
      const lines = entry.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length < 1) continue;
      
      const edu: ParsedEducation = {
        school: lines[0]
      };
      
      // Look for degree
      for (const line of lines) {
        const degreeMatch = line.match(/(bachelor|master|phd|doctorate|associate|ba|bs|ma|ms|mba|md|jd)\s*(?:of|in)?\s*([\w\s]+)?/i);
        if (degreeMatch) {
          edu.degree = line;
        }
        
        // Dates
        const dateMatch = line.match(/(\d{4})\s*[-–—]\s*(\d{4}|present)/i);
        if (dateMatch) {
          edu.startDate = dateMatch[1];
          edu.endDate = dateMatch[2]?.toLowerCase() === 'present' ? undefined : dateMatch[2];
        }
        
        // GPA
        const gpaMatch = line.match(/gpa[:\s]+(\d\.?\d*)/i);
        if (gpaMatch) {
          edu.gpa = gpaMatch[1];
        }
      }
      
      educations.push(edu);
    }
    
    return educations;
  }
  
  private static extractSkills(text: string): ParsedSkill[] {
    const skills: ParsedSkill[] = [];
    
    // Find skills section
    const skillsMatch = text.match(/(?:skills|technical skills|core competencies|key skills)([:\n]+)([\s\S]*?)(?=\n\s*(?:experience|education|certifications|projects|languages|references|interests|$))/i);
    if (!skillsMatch) return skills;
    
    const skillsSection = skillsMatch[2];
    const lines = skillsSection.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    let currentCategory: string | undefined;
    let currentSkills: string[] = [];
    
    for (const line of lines) {
      // Check if line is a category header (ends with : or short capitalized text)
      if (line.match(/^[A-Z][\w\s]+:/) || (line.length < 30 && line === line.toUpperCase())) {
        if (currentSkills.length > 0) {
          skills.push({ category: currentCategory, skills: [...currentSkills] });
          currentSkills = [];
        }
        currentCategory = line.replace(/:$/, '');
      } else {
        // Parse skills (comma-separated or bullet points)
        const skillsList = line.split(/[,;•\-]/).map(s => s.trim()).filter(s => s.length > 0);
        currentSkills.push(...skillsList);
      }
    }
    
    if (currentSkills.length > 0) {
      skills.push({ category: currentCategory, skills: currentSkills });
    }
    
    return skills;
  }
  
  private static extractCertifications(text: string): ParsedCertification[] {
    const certs: ParsedCertification[] = [];
    
    // Find certifications section
    const certMatch = text.match(/(?:certifications?|licenses?|professional certifications?)([:\n]+)([\s\S]*?)(?=\n\s*(?:experience|education|skills|projects|languages|references|interests|$))/i);
    if (!certMatch) return certs;
    
    const certSection = certMatch[2];
    const lines = certSection.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for certification name and issuer
      const certMatch = line.match(/^([\w\s\-]+(?:certified|certification|certificate)[\w\s\-]*)$/i) ||
                       line.match(/^([A-Z][\w\s]+(?:AWS|Azure|Google|Microsoft|Cisco|PMP|Scrum)[\w\s]*)$/);
      
      if (certMatch || line.length > 5) {
        const cert: ParsedCertification = {
          name: line
        };
        
        // Check next line for issuer/date
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          if (nextLine.match(/\d{4}/)) {
            cert.issueDate = nextLine.match(/\d{4}/)?.[0];
          } else if (nextLine.length < 50) {
            cert.issuingOrganization = nextLine;
          }
        }
        
        certs.push(cert);
      }
    }
    
    return certs;
  }
}

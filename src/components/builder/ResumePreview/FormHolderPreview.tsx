import { FormHolder } from "@/types/FormHolderTypes";
import {
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
} from "@/types/ResumeFormTypes";

interface FormHolderPreviewProps {
  formHolder: FormHolder;
  themeColor: string;
}

// Helper to convert CSSJSON to inline styles
const getContainerStyles = (style: Record<string, Record<string, string | number>> | undefined, formHolderId: string): React.CSSProperties => {
  if (!style) return {};
  
  // Look for the main container selector (.th-{id})
  const containerSelector = `.th-${formHolderId}`;
  const containerStyles = style[containerSelector];
  
  if (!containerStyles) return {};
  
  // Convert kebab-case to camelCase for React
  const reactStyles: React.CSSProperties = {};
  for (const [key, value] of Object.entries(containerStyles)) {
    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    (reactStyles as any)[camelKey] = value;
  }
  
  return reactStyles;
};

// Helper to get section title styles
const getTitleStyles = (style: Record<string, Record<string, string | number>> | undefined, formHolderId: string, defaultColor: string): React.CSSProperties => {
  if (!style) return { color: defaultColor };
  
  // Look for sectionTitle selector
  const titleSelector = `.th-${formHolderId} .sectionTitle`;
  const titleStyles = style[titleSelector];
  
  if (!titleStyles) return { color: defaultColor };
  
  const reactStyles: React.CSSProperties = {};
  for (const [key, value] of Object.entries(titleStyles)) {
    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    (reactStyles as any)[camelKey] = value;
  }
  
  return reactStyles;
};

const renderProfile = (data: ResumeProfile[], themeColor: string) => {
  const profile = data[0];
  if (!profile) return null;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
      {profile.summary && (
        <p className="text-gray-600 mb-3">{profile.summary}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {profile.infos?.map((info, index) => (
          <span key={index} className="flex items-center gap-1">
            {info.title}
          </span>
        ))}
        {profile.urls?.map((url, index) => (
          <a
            key={index}
            href={url.url}
            className="flex items-center gap-1 hover:underline"
            style={{ color: themeColor }}
          >
            {url.title}
          </a>
        ))}
      </div>
    </div>
  );
};

const renderExperience = (data: ResumeExperience[], themeColor: string) => {
  // Filter visible entries
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
              <p style={{ color: themeColor }} className="font-medium">
                {exp.company}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {exp.startDate} - {exp.isCurrentRole ? "Present" : exp.endDate}
            </span>
          </div>
          {exp.location && (
            <p className="text-sm text-gray-500">{exp.location}</p>
          )}
          {exp.description && (
            <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
          )}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {exp.achievements && exp.achievements.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const renderEducation = (data: ResumeEducation[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((edu) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
              <p style={{ color: themeColor }}>{edu.school}</p>
            </div>
            <span className="text-sm text-gray-500">
              {edu.startDate} - {edu.isCurrentlyStudying ? "Present" : edu.endDate}
            </span>
          </div>
          {edu.fieldOfStudy && (
            <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
          )}
          {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
          {edu.honors && edu.honors.length > 0 && (
            <p className="text-sm text-gray-600">Honors: {edu.honors.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const renderProject = (data: ResumeProject[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((project) => (
        <div key={project.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{project.project}</h3>
              {project.role && (
                <p style={{ color: themeColor }}>{project.role}</p>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {project.startDate} - {project.isOngoing ? "Present" : project.endDate}
            </span>
          </div>
          {project.description && (
            <p className="text-sm text-gray-700 mt-1">{project.description}</p>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const renderSkills = (data: ResumeSkills[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((skill) => (
        <div key={skill.id} className="mb-2">
          <h3 style={{ color: themeColor }} className="font-medium">
            {skill.category}
          </h3>
          {skill.skills && skill.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {skill.skills.map((s, i) => (
                <span key={i} className="text-sm text-gray-700">
                  {s}
                  {i < skill.skills.length - 1 && ","}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const renderCertification = (data: ResumeCertification[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((cert) => (
        <div key={cert.id} className="mb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{cert.name}</h3>
              <p style={{ color: themeColor }}>{cert.issuingOrganization}</p>
            </div>
            <span className="text-sm text-gray-500">{cert.issueDate}</span>
          </div>
          {cert.credentialId && (
            <p className="text-sm text-gray-600">Credential ID: {cert.credentialId}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const renderLanguage = (data: ResumeLanguage[]) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-3">
        {visibleData.map((lang) => (
          <div key={lang.id} className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{lang.language}</span>
            <span className="text-sm text-gray-500">({lang.proficiency})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderAward = (data: ResumeAward[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((award) => (
        <div key={award.id} className="mb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{award.title}</h3>
              <p style={{ color: themeColor }}>{award.issuer}</p>
            </div>
            <span className="text-sm text-gray-500">{award.dateReceived}</span>
          </div>
          {award.description && (
            <p className="text-sm text-gray-600">{award.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const renderVolunteer = (data: ResumeVolunteer[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((vol) => (
        <div key={vol.id} className="mb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{vol.role}</h3>
              <p style={{ color: themeColor }}>{vol.organization}</p>
            </div>
            <span className="text-sm text-gray-500">
              {vol.startDate} - {vol.isCurrentRole ? "Present" : vol.endDate}
            </span>
          </div>
          {vol.description && (
            <p className="text-sm text-gray-600">{vol.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const renderPublication = (data: ResumePublication[], themeColor: string) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((pub) => (
        <div key={pub.id} className="mb-2">
          <h3 className="font-semibold text-gray-900">{pub.title}</h3>
          <p style={{ color: themeColor }}>{pub.publisher}</p>
          <span className="text-sm text-gray-500">{pub.publicationDate}</span>
          {pub.description && (
            <p className="text-sm text-gray-600">{pub.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const renderCustom = (data: ResumeCustom[]) => {
  const visibleData = data.filter(item => item.visible !== false);
  if (visibleData.length === 0) return null;
  
  return (
    <div className="mb-4">
      {visibleData.map((item) => (
        <div key={item.id} className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            {item.startDate && (
              <span className="text-sm text-gray-500">
                {item.startDate} - {item.endDate}
              </span>
            )}
          </div>
          {item.subtitle && (
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          )}
          {item.description && (
            <p className="text-sm text-gray-700">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default function FormHolderPreview({
  formHolder,
  themeColor,
}: FormHolderPreviewProps) {
  const { type, title, data, style, id } = formHolder;

  const renderContent = () => {
    switch (type) {
      case "profile":
        return renderProfile(data as ResumeProfile[], themeColor);
      case "experience":
        return renderExperience(data as ResumeExperience[], themeColor);
      case "education":
        return renderEducation(data as ResumeEducation[], themeColor);
      case "project":
        return renderProject(data as ResumeProject[], themeColor);
      case "skills":
        return renderSkills(data as ResumeSkills[], themeColor);
      case "certification":
        return renderCertification(data as ResumeCertification[], themeColor);
      case "language":
        return renderLanguage(data as ResumeLanguage[]);
      case "award":
        return renderAward(data as ResumeAward[], themeColor);
      case "volunteer":
        return renderVolunteer(data as ResumeVolunteer[], themeColor);
      case "publication":
        return renderPublication(data as ResumePublication[], themeColor);
      case "custom":
        return renderCustom(data as ResumeCustom[]);
      default:
        return null;
    }
  };

  const isProfile = type === "profile";
  const containerStyles = getContainerStyles(style, id);
  const titleStyles = getTitleStyles(style, id, themeColor);

  return (
    <div
      className={`${isProfile ? "" : "border-b border-gray-200 pb-4 mb-4"}`}
      style={containerStyles}
    >
      {!isProfile && (
        <h2
          className="text-lg font-bold mb-3 flex items-center gap-2"
          style={titleStyles}
        >
          {title}
        </h2>
      )}
      {renderContent()}
    </div>
  );
}

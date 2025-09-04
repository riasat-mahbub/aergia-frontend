import { SkillsFormHolder } from "@/types/FormHolderTypes";
import { ResumeSkills } from "@/types/ResumeFormTypes";

export default function SkillsForm({skillsFormHolder}: { skillsFormHolder: SkillsFormHolder }) {
  return (
    <div className="flex flex-col skillsHolder">
      <div className="skillsHolderTitle">{skillsFormHolder.title}</div>
      {skillsFormHolder.data.map((form: ResumeSkills, index) => {
        return (
          <div key={form.id} className="skillsForm">
            {form.featuredSkills.map((skill, skillIndex) => (
              <div key={skill.id} className="featuredSkill">
                <div className="featuredSkillName">{skill.skill}</div>
                <div className="featuredSkillRating">{skill.rating}</div>
              </div>
            ))}
            <div className="skillsDescription">{form.description}</div>
          </div>
        );
      })}
    </div>
  );
}
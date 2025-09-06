import { SkillsFormHolder } from "@/types/FormHolderTypes";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import { Circle } from "lucide-react";

export default function SkillsForm({skillsFormHolder}: { skillsFormHolder: SkillsFormHolder }) {
  return (
    <div className="flex flex-col skillsHolder">
      <div className="skillsHolderTitle">{skillsFormHolder.title}</div>
      {skillsFormHolder.data.map((form: ResumeSkills, index) => {
        return (
          <div key={form.id} className="skillForm">
            <div className="skillFormSkill">{form.skill}</div>
            <div className="skillFormRating">
              {(() => {
                let ratings = []
                for (let i = 0; i < form.rating; i++) {
                  ratings.push(<Circle key={i} className="SkillFormRatingGraphic"/>)
                }
                return ratings;
              })()}
            </div>
            <div className="skillFormDescription">{form.description}</div>
          </div>
        );
      })}
    </div>
  );
}
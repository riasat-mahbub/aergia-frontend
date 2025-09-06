import SafeHTML from "@/components/SafeHTML";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import { Circle } from "lucide-react";

export default function SkillsForm({form}: { form: ResumeSkills }) {
    if(form.visible){
      return(
        <div key={form.id} className="skillForm">
          <div className="skillFormSkill">{form.skill}</div>
          <div className="skillFormRating">
            {(() => {
              let ratings = []
              for (let i = 0; i < form.rating; i++) {
                ratings.push(<Circle key={i} className="skillFormRatingGraphic"/>)
              }
              return ratings;
            })()}
          </div>
          <SafeHTML className="skillFormDescription" html={form.description}/>
        </div>
      )

    }
}
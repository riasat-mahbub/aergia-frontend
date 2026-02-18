import { ResumeForm } from "@/types/ResumeFormTypes";

interface FormProps {
  form: ResumeForm;
  formType: string;
}

export default function Form({ form, formType }: FormProps) {
  const renderFields = () => {
    switch (formType) {
      case "profile":
        return (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              defaultValue={"name" in form ? form.name : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Title"
              defaultValue={"title" in form ? form.title : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Summary"
              defaultValue={"summary" in form ? form.summary : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        );
      case "experience":
        return (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Company"
              defaultValue={"company" in form ? form.company : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Position"
              defaultValue={"jobTitle" in form ? form.jobTitle : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case "education":
        return (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Institution"
              defaultValue={"school" in form ? form.school : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Degree"
              defaultValue={"degree" in form ? form.degree : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case "skills":
        return (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Skill Name"
              defaultValue={"name" in form ? form.name : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      default:
        return (
          <div className="text-gray-500 text-sm">
            No form fields available for this type.
          </div>
        );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      {renderFields()}
    </div>
  );
}

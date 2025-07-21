"use client";

import { FormHolder } from "@/types/FormHolderTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { resumeStyles } from "./ResumeStyles";
import { useRef, useState, useEffect } from "react";

const ResumePreview = ({ formHolders }: { formHolders: FormHolder[] }) => {
  const currentDataString = JSON.stringify(formHolders);
  const formDataKey = useRef(currentDataString);
  
  // Helper function to render form fields
  const renderFormFields = (form: ResumeForm) => {
    if (!form.visible) return null;

    const fields = [];

    // Add title if available
    if (form.title) {
      fields.push(
        <h3 key={`title-${form.id}`} style={resumeStyles.subheading}>
          {form.title}
        </h3>
      );
    }

    // Handle different form types
    switch (form.type) {
      case "profile":
        const profile = form as any;
        fields.push(
          <p key={`${form.id}-name`} style={resumeStyles.text}>
            {profile.name}
          </p>,
          <p key={`${form.id}-email`} style={resumeStyles.text}>
            {profile.email}
          </p>,
          <p key={`${form.id}-phone`} style={resumeStyles.text}>
            {profile.phone}
          </p>
        );
        if (profile.location) {
          fields.push(
            <p key={`${form.id}-location`} style={resumeStyles.text}>
              {profile.location}
            </p>
          );
        }
        if (profile.url) {
          fields.push(
            <p key={`${form.id}-url`} style={resumeStyles.text}>
              {profile.url}
            </p>
          );
        }
        if (profile.summary) {
          fields.push(
            <p key={`${form.id}-summary`} style={resumeStyles.text}>
              {profile.summary}
            </p>
          );
        }
        break;

      case "workExperience":
        const work = form as any;
        fields.push(
          <p key={`${form.id}-company`} style={resumeStyles.text}>
            <span style={{ fontWeight: "bold" }}>{work.company}</span> - {work.jobTitle}
          </p>,
          <p key={`${form.id}-date`} style={resumeStyles.text}>
            {work.date}
          </p>
        );
        if (work.descriptions && work.descriptions.length > 0) {
          work.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <p key={`${form.id}-desc-${i}`} style={resumeStyles.text}>
                • {desc}
              </p>
            );
          });
        }
        break;

      case "education":
        const edu = form as any;
        fields.push(
          <p key={`${form.id}-school`} style={resumeStyles.text}>
            <span style={{ fontWeight: "bold" }}>{edu.school}</span> - {edu.degree}
          </p>,
          <p key={`${form.id}-date`} style={resumeStyles.text}>
            {edu.date}
          </p>
        );
        if (edu.gpa) {
          fields.push(
            <p key={`${form.id}-gpa`} style={resumeStyles.text}>
              GPA: {edu.gpa}
            </p>
          );
        }
        if (edu.descriptions && edu.descriptions.length > 0) {
          edu.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <p key={`${form.id}-desc-${i}`} style={resumeStyles.text}>
                • {desc}
              </p>
            );
          });
        }
        break;

      case "project":
        const project = form as any;
        fields.push(
          <p key={`${form.id}-project`} style={resumeStyles.text}>
            <span style={{ fontWeight: "bold" }}>{project.project}</span>
          </p>,
          <p key={`${form.id}-date`} style={resumeStyles.text}>
            {project.date}
          </p>
        );
        if (project.descriptions && project.descriptions.length > 0) {
          project.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <p key={`${form.id}-desc-${i}`} style={resumeStyles.text}>
                • {desc}
              </p>
            );
          });
        }
        break;

      case "skills":
        const skills = form as any;
        if (skills.featuredSkills && skills.featuredSkills.length > 0) {
          const skillsText = skills.featuredSkills
            .map((skill: any) => skill.skill)
            .filter(Boolean)
            .join(", ");

          fields.push(
            <p key={`${form.id}-skills`} style={resumeStyles.text}>
              {skillsText}
            </p>
          );
        }
        if (skills.descriptions && skills.descriptions.length > 0) {
          skills.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <p key={`${form.id}-desc-${i}`} style={resumeStyles.text}>
                • {desc}
              </p>
            );
          });
        }
        break;

      case "custom":
      default:
        const custom = form as any;
        if (custom.description) {
          fields.push(
            <p key={`${form.id}-desc`} style={resumeStyles.text}>
              {custom.description}
            </p>
          );
        }
        break;
    }

    return fields;
  };

  // Client-side only component
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="relative h-[89vh] overflow-auto">
      <div style={resumeStyles.page}>
        {formHolders.map((holder: FormHolder) => (
          <div key={holder.id} style={resumeStyles.section}>
            <h2 style={resumeStyles.heading}>{holder.title}</h2>
            {holder.data
              .filter((form) => form.visible !== false)
              .map((form) => (
                <div key={form.id}>{renderFormFields(form)}</div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
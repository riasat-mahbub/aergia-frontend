"use client";

import { FormHolder } from "@/types/FormHolderTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { resumeStyles } from "./ResumeStyles";

// Create PDF-specific styles based on shared styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: resumeStyles.page.backgroundColor,
    padding: Number(resumeStyles.page.padding.replace('px', '')),
  },
  section: {
    marginBottom: Number(resumeStyles.section.marginBottom.replace('px', '')),
  },
  heading: {
    fontSize: Number(resumeStyles.heading.fontSize.replace('px', '')),
    fontWeight: resumeStyles.heading.fontWeight,
    marginBottom: Number(resumeStyles.heading.marginBottom.replace('px', '')),
  },
  subheading: {
    fontSize: Number(resumeStyles.subheading.fontSize.replace('px', '')),
    fontWeight: resumeStyles.subheading.fontWeight,
    marginBottom: Number(resumeStyles.subheading.marginBottom.replace('px', '')),
  },
  text: {
    fontSize: Number(resumeStyles.text.fontSize.replace('px', '')),
    marginBottom: Number(resumeStyles.text.marginBottom.replace('px', '')),
  },
});

// PDF Document component
const ResumeDocument = ({ formHolders }: { formHolders: FormHolder[] }) => {
  // Helper function to render form fields
  const renderFormFields = (form: ResumeForm) => {
    if (!form.visible) return null;

    const fields = [];

    // Add title if available
    if (form.title) {
      fields.push(
        <Text key={`title-${form.id}`} style={styles.subheading}>
          {form.title}
        </Text>
      );
    }

    // Handle different form types
    switch (form.type) {
      case "profile":
        const profile = form as any;
        fields.push(
          <Text key={`${form.id}-name`} style={styles.text}>
            {profile.name}
          </Text>,
          <Text key={`${form.id}-email`} style={styles.text}>
            {profile.email}
          </Text>,
          <Text key={`${form.id}-phone`} style={styles.text}>
            {profile.phone}
          </Text>,
          profile.location && (
            <Text key={`${form.id}-location`} style={styles.text}>
              {profile.location}
            </Text>
          ),
          profile.url && (
            <Text key={`${form.id}-url`} style={styles.text}>
              {profile.url}
            </Text>
          ),
          profile.summary && (
            <Text key={`${form.id}-summary`} style={styles.text}>
              {profile.summary}
            </Text>
          )
        );
        break;

      case "workExperience":
        const work = form as any;
        fields.push(
          <Text key={`${form.id}-company`} style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{work.company}</Text> -{" "}
            {work.jobTitle}
          </Text>,
          <Text key={`${form.id}-date`} style={styles.text}>
            {work.date}
          </Text>
        );
        if (work.descriptions && work.descriptions.length > 0) {
          work.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <Text key={`${form.id}-desc-${i}`} style={styles.text}>
                • {desc}
              </Text>
            );
          });
        }
        break;

      case "education":
        const edu = form as any;
        fields.push(
          <Text key={`${form.id}-school`} style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{edu.school}</Text> -{" "}
            {edu.degree}
          </Text>,
          <Text key={`${form.id}-date`} style={styles.text}>
            {edu.date}
          </Text>,
          edu.gpa && (
            <Text key={`${form.id}-gpa`} style={styles.text}>
              GPA: {edu.gpa}
            </Text>
          )
        );
        if (edu.descriptions && edu.descriptions.length > 0) {
          edu.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <Text key={`${form.id}-desc-${i}`} style={styles.text}>
                • {desc}
              </Text>
            );
          });
        }
        break;

      case "project":
        const project = form as any;
        fields.push(
          <Text key={`${form.id}-project`} style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{project.project}</Text>
          </Text>,
          <Text key={`${form.id}-date`} style={styles.text}>
            {project.date}
          </Text>
        );
        if (project.descriptions && project.descriptions.length > 0) {
          project.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <Text key={`${form.id}-desc-${i}`} style={styles.text}>
                • {desc}
              </Text>
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
            <Text key={`${form.id}-skills`} style={styles.text}>
              {skillsText}
            </Text>
          );
        }
        if (skills.descriptions && skills.descriptions.length > 0) {
          skills.descriptions.forEach((desc: string, i: number) => {
            fields.push(
              <Text key={`${form.id}-desc-${i}`} style={styles.text}>
                • {desc}
              </Text>
            );
          });
        }
        break;

      case "custom":
      default:
        const custom = form as any;
        if (custom.description) {
          fields.push(
            <Text key={`${form.id}-desc`} style={styles.text}>
              {custom.description}
            </Text>
          );
        }
        break;
    }

    return fields;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {formHolders.map((holder: FormHolder) => (
          <View key={holder.id} style={styles.section}>
            <Text style={styles.heading}>{holder.title}</Text>
            {holder.data
              .filter((form) => form.visible !== false)
              .map((form) => (
                <View key={form.id}>{renderFormFields(form)}</View>
              ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ResumeDocument;
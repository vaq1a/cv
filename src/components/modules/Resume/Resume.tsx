import { type FC } from "react";
import PersonalInfo from "@/components/modules/Resume/PersonalInfo/PersonalInfo";
import AboutMe from "@/components/modules/Resume/AboutMe/AboutMe";
import Contacts from "@/components/modules/Resume/Contacts/Contacts";
import Skills from "@/components/modules/Resume/Skills/Skills";
import Education from "@/components/modules/Resume/Education/Education";
import Languages from "@/components/modules/Resume/Languages/Languages";
import Experience from "@/components/modules/Resume/Experience/Experience";
import PersonalPhoto from "@/components/modules/Resume/PersonalPhoto/PersonalPhoto";
import { type ResumeItems } from "@/types/resume";

import styles from "./Resume.module.scss";

interface ResumeProps {
  resume: {
    personalPhoto: string | null;
    personalInfo: ResumeItems | null;
    contacts: ResumeItems | null;
    aboutMe: ResumeItems | null;
    experience: ResumeItems | null;
    skills: ResumeItems | null;
    educations: ResumeItems | null;
    languages: ResumeItems | null;
    id: number;
  };
}

export const Resume: FC<ResumeProps> = ({ resume }) => {
  return (
    <main className={styles.main}>
      {resume?.personalPhoto && (
        <PersonalPhoto personalPhoto={resume?.personalPhoto} />
      )}
      {resume?.personalInfo && (
        <PersonalInfo
          content={resume.personalInfo}
          className={styles.main__personalInfo}
        />
      )}
      {resume?.contacts && (
        <Contacts content={resume.contacts} className={styles.main__contacts} />
      )}
      {resume?.aboutMe && (
        <AboutMe content={resume?.aboutMe} className={styles.main__aboutMe} />
      )}
      <div className={styles.main__info}>
        {resume?.skills && (
          <Skills content={resume.skills} className={styles.main__skills} />
        )}
        {resume?.educations && (
          <Education
            content={resume.educations}
            className={styles.main__education}
          />
        )}
        {resume?.languages && (
          <Languages
            content={resume.languages}
            className={styles.main__languages}
          />
        )}
      </div>
      {resume?.experience && (
        <Experience
          content={resume?.experience}
          className={styles.main__experience}
        />
      )}
    </main>
  );
};

import type { FC } from "react";

import PersonalInfoForm from "@/components/modules/Forms/PersonalInfoForm/PersonalInfoForm";
import AboutMeForm from "@/components/modules/Forms/AboutMeForm/AboutMeForm";
import ContactsForm from "@/components/modules/Forms/ContactsForm/ContactsForm";
import SkillsForm from "@/components/modules/Forms/SkillsForm/SkillsForm";
import EducationsForm from "@/components/modules/Forms/EducationsForm/EducationsForm";
import LanguagesForm from "@/components/modules/Forms/LanguagesForm/LanguagesForm";
import ExperienceForm from "@/components/modules/Forms/ExperienceForm/ExperienceForm";
import PersonalPhotoForm from "@/components/modules/Forms/PersonalPhotoForm/PersonalPhotoForm";
import classNames from "@/helpers/classNames";

import styles from "./ResumeForms.module.scss";

interface ResumeFormsProps {
  className?: string;
}

const ResumeForms: FC<ResumeFormsProps> = ({ className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <PersonalPhotoForm />
      <PersonalInfoForm />
      <ContactsForm />
      <AboutMeForm />
      <div className={styles.column}>
        <SkillsForm />
        <EducationsForm />
        <LanguagesForm />
      </div>
      <ExperienceForm />
    </div>
  );
};

export default ResumeForms;

"use client";

import { usePersonalPhoto } from "@/hooks/usePersonalPhoto";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import Image from "next/image";
import UiIcon from "@/components/ui/UiIcon/UiIcon";

import styles from "./PersonalPhotoForm.module.scss";

const PersonalPhotoForm = () => {
  const { isMounted, isLoading, uploadedUrl, handleFileUpload, isUploading } =
    usePersonalPhoto();

  if (!isMounted || isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className={styles.wrapper}>
      {uploadedUrl && (
        <Image
          src={uploadedUrl}
          alt="Profile picture"
          width={264}
          height={264}
          unoptimized
          className={styles.image}
          priority
        />
      )}

      <label
        htmlFor="file-upload"
        className={styles.labelWrapper}
        aria-label="Upload image"
      >
        <UiIcon name="user-plus" className={styles.icon} aria-hidden="true" />
      </label>

      <input
        type="file"
        id="file-upload"
        className={styles.input}
        onChange={handleFileUpload}
        disabled={isUploading}
        accept="image/*"
      />

      {/*TODO: loading*/}
      {/*{isUploading && (*/}
      {/*  <div className={styles.loadingOverlay}>*/}
      {/*    <Spinner size="md" />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default PersonalPhotoForm;

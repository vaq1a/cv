import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { FILE_FIELD_ERROR } from "@/constant/notifications";
import { useResume } from "@/hooks/useResume";
import { logger } from "@/lib/logger";

export const usePersonalPhoto = () => {
  const { toast } = useToast();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const { mutateAsync: getPresignedUrl } =
    api.upload.getPresignedUrl.useMutation();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || file.size === 0) {
      logger.warn("File is empty or not selected");
      return;
    }

    try {
      setIsUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64String = reader.result as string;

        const result = await getPresignedUrl({
          fileName: file.name,
          fileType: file.type,
          fileContent: base64String,
        });

        if (!result?.url) {
          toast({
            description: FILE_FIELD_ERROR,
          });

          return;
        }

        setUploadedUrl(result.url);
      };
    } catch (error) {
      logger.error("Error uploading file", error);
    } finally {
      setIsUploading(false);
    }
  };

  const { resume, isLoading } = useResume();

  const currentResume = resume?.[0];

  useEffect(() => {
    if (currentResume?.personalPhoto) {
      setUploadedUrl(currentResume.personalPhoto);
    }
  }, [currentResume]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
    isLoading,
    uploadedUrl,
    handleFileUpload,
    isUploading,
  };
};

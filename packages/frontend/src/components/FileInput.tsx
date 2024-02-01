import { ChangeEvent, useState } from "react";

interface FileInputProps {
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileInput({ imageSrc, setImageSrc }: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .gif, .svg, .txt, .doc, .docx, .pdf"
      />
      {selectedFile && <img src={imageSrc} alt="preview" />}
    </>
  );
}

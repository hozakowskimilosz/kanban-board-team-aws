import { ChangeEvent, useState } from "react";

interface FileInputProps {
  fileSrc: string;
  setFileSrc: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileInput({
  fileSrc,
  setFileSrc,
  setFileName,
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const file = files[0];

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileSrc(reader.result as string);
        setFileName(file.name);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .gif, .svg, .txt, .doc, .docx, .pdf"
      />
      {selectedFile && <img src={fileSrc} alt="preview" />}
    </>
  );
}

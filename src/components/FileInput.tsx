import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import icoCamera from "@/public/assets/ic_camera.svg";

interface FileInputProps {
  value: File | null;
  onChange: (file: File | null) => void;
  setUrl: (ar0: string) => void;
}

export default function FileInput({ value, setUrl, onChange }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!value) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setUrl(reader.result as string);
    };

    reader.readAsDataURL(value);
  }, [value, preview, onChange, setPreview]);

  return (
    <div>
      {preview ? (
        <Image src={preview} width={288} height={240} alt="이미지 미리보기" />
      ) : (
        <>
          <label htmlFor="item-file" className="flex min-h-60 justify-center bg-gray-50">
            <Image width="48" height="48" src={icoCamera} alt="아이콘" aria-hidden="true" />
          </label>
          <input type="file" id="item-file" accept="image/png, image/jpeg" ref={fileInput} onChange={handleChange} className="hidden" />
        </>
      )}
    </div>
  );
}

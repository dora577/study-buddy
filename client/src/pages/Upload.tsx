import React, { useState } from "react";
import { ingest } from "../api";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [docId, setDocId] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const submit = async () => {
    try {
      await ingest({ file, url, docId });
      setStatus("Ingested");
    } catch (e) {
      setStatus("Error");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
      />
      <input
        type="text"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Doc ID"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={submit}>Ingest</button>
      <div>{status}</div>
    </div>
  );
};

export default Upload;

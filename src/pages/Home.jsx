import { useState } from "react";
import URLForm from "../components/URLForm";
import URLResult from "../components/URLResult";
import { ClipboardCopy, Check } from "lucide-react";

function Home() {
  const [url, setUrl] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [copy, setCopy] = useState("Copy");
  const [icon, setIcon] = useState(<ClipboardCopy size={16} />);

  const createShortUrl = async (data) => {
    try {
      const res = await fetch("http://localhost:5164/short", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const getRes = await res.json();
      setUrl(getRes);
      setTextToCopy(getRes.shortUrl);
      console.log(getRes);
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopy("Copied");
    setIcon(<Check size={16} />);
    setTimeout(() => {
      setCopy("Copy");
      setIcon(<ClipboardCopy size={16} />);
    }, 2000);
  };

  return (
    <>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-4">
              <URLForm onShorUrlClick={createShortUrl} urlPresent={url} />
            </div>
            {url !== "" && url.shortUrl && (
              <div className="mt-9">
                <URLResult
                  viewShortUrl={url}
                  copy={copy}
                  icon={icon}
                  textCopied={copyToClipboard}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

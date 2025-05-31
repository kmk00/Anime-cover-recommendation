const LanguageFlag = ({ language }: { language: string }) => {
  const languageToCode: { [key: string]: string } = {
    Japanese: "jp",
    English: "us",
    French: "fr",
    Spanish: "es",
    Korean: "kr",
    German: "de",
    "Portuguese (BR)": "br",
    Italian: "it",
  };

  const code = languageToCode[language] || "globe";

  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-sub-muted text-xs font-bold overflow-hidden"
      title={language}
    >
      {code === "globe" ? language.toLowerCase().substring(0, 2) : code}
    </span>
  );
};

export default LanguageFlag;

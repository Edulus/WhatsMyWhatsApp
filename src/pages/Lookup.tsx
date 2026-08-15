import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import { trpc } from "@/providers/trpc";

export default function Lookup() {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get("phrase") ?? "";
  const parts = initial.trim().split(/\s+/).filter(Boolean);
  const [word1, setWord1] = useState(parts[0] ?? "");
  const [word2, setWord2] = useState(parts[1] ?? "");
  const [word3, setWord3] = useState(parts[2] ?? "");
  const [query, setQuery] = useState<string | null>(
    parts.length === 3 ? parts.join(" ") : null,
  );

  const result = trpc.words.lookup.useQuery(
    { phrase: query ?? "" },
    { enabled: query !== null, retry: false },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery([word1, word2, word3].join(" "));
  };

  const entry = result.data;
  const waLink = entry ? `https://wa.me/${entry.whatsappNumber}` : null;

  return (
    <div className="flex justify-center px-4 py-8 min-h-screen">
      <div className="wmw-card w-full max-w-[700px] p-6 sm:p-8 h-fit">
        <h1 className="gradient-title text-center text-4xl sm:text-5xl">
          🔍 Look Up 3
        </h1>
        <p className="text-xl mt-4">
          <span className="text-[#097d70] font-bold italic text-2xl">
            Enter
          </span>{" "}
          the 3️⃣ words your contact gave you.
        </p>
        <p className="text-center font-bold text-2xl mt-2">
          ⚡️ Do it now !! ⚡️
        </p>
        <form onSubmit={submit} className="mt-6 space-y-5 max-w-md mx-auto">
          <div>
            <label className="wmw-label" htmlFor="wordOne">Word 1️⃣</label>
            <input
              id="wordOne"
              className="wmw-input"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="wmw-label" htmlFor="wordTwo">Word 2️⃣</label>
            <input
              id="wordTwo"
              className="wmw-input"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="wmw-label" htmlFor="wordThree">Word 3️⃣</label>
            <input
              id="wordThree"
              className="wmw-input"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              required
            />
          </div>
          {result.error && (
            <p className="text-red-700 font-bold text-center text-lg">
              ⚠️ {result.error.message}
            </p>
          )}
          <div className="flex justify-center gap-3 flex-wrap pt-2">
            <button
              className="wmw-btn"
              type="submit"
              disabled={result.isFetching}
            >
              {result.isFetching ? "Looking up..." : "Submit 📨"}
            </button>
            <Link to="/" className="wmw-btn">🏠 Home</Link>
          </div>
        </form>

        {entry && (
          <div className="mt-8 text-center border-t-2 border-[#128c7e33] pt-6">
            <p className="text-2xl font-bold text-[#075e54]">
              Found it! 🎉
            </p>
            {entry.displayName && (
              <p className="animate-charcter text-4xl mt-3">
                {entry.displayName}
              </p>
            )}
            <p className="text-2xl font-bold mt-3 tracking-wide">
              +{entry.whatsappNumber}
            </p>
            {waLink && (
              <div className="flex justify-center mt-5">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <QRCodeSVG value={waLink} size={180} />
                </div>
              </div>
            )}
            <p className="text-lg mt-3">
              Scan the QR code to open a WhatsApp chat instantly
            </p>
            <div className="flex justify-center gap-3 mt-5 flex-wrap">
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wmw-btn"
                >
                  💬 Open Chat
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

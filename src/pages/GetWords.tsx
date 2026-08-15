import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";

export default function GetWords() {
  const [displayName, setDisplayName] = useState("");
  const [number, setNumber] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState<{
    phrase: string;
    words: [string, string, string];
  } | null>(null);

  const register = trpc.words.register.useMutation({
    onSuccess: (entry) => {
      setError(null);
      setRegistered({
        phrase: entry.phrase,
        words: [entry.word1, entry.word2, entry.word3],
      });
    },
    onError: (err) => setError(err.message),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    register.mutate({
      displayName: displayName || undefined,
      whatsappNumber: number,
      words: [word1, word2, word3],
    });
  };

  const lookupUrl = `/lookup?phrase=${encodeURIComponent(
    registered?.phrase ?? "",
  )}`;

  if (registered) {
    return (
      <div className="flex justify-center px-4 py-8 min-h-screen">
        <div className="wmw-card w-full max-w-[700px] p-6 sm:p-8 h-fit text-center">
          <h1 className="gradient-title text-4xl sm:text-5xl">
            You're Registered!
          </h1>
          <p className="text-4xl mt-6">🎉🎉🎉</p>
          <p className="text-xl mt-4">Your WhatsApp number is now represented by:</p>
          <p className="animate-charcter text-4xl sm:text-5xl mt-4">
            {registered.words.join(" · ")}
          </p>
          <p className="text-xl mt-6">
            Share these 3 words with anyone — over the phone, on the radio,
            or in person — and they can look you up right here.
          </p>
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            <button
              className="wmw-btn"
              onClick={() => {
                navigator.clipboard?.writeText(
                  registered.words.join(" "),
                );
              }}
            >
              📋 Copy Words
            </button>
            <Link to={lookupUrl} className="wmw-btn">
              🔍 Try the Lookup
            </Link>
            <Link to="/" className="wmw-btn">
              🏠 Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-8 min-h-screen">
      <div className="wmw-card w-full max-w-[700px] p-6 sm:p-8 h-fit">
        <h1 className="gradient-title text-center text-4xl sm:text-5xl">
          🤲 Get 3
        </h1>
        <p className="text-xl text-justify mt-4">
          <span className="text-[#097d70] font-bold italic text-2xl">
            Fill out
          </span>{" "}
          the fields below with your number &amp; the three words that you'd
          like to represent your WhatsApp contact information. You'll be able
          to give these words to anyone and they'll be able to use them to
          look you up on <Link to="/lookup" className="underline font-bold">this page</Link> of
          our site.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-5 max-w-md mx-auto">
          <div>
            <label className="wmw-label" htmlFor="displayName">
              Your name <span className="font-normal">(optional)</span>
            </label>
            <input
              id="displayName"
              className="wmw-input"
              placeholder="e.g. Edward"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <label className="wmw-label" htmlFor="whatsAppNumber">
              💬 WhatsApp Number
            </label>
            <input
              id="whatsAppNumber"
              className="wmw-input"
              placeholder="+1 514 555 1234 — include country code"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="wmw-label" htmlFor="wordOne">Word 1️⃣</label>
            <input
              id="wordOne"
              className="wmw-input"
              placeholder="e.g. BBC"
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
              placeholder="e.g. World"
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
              placeholder="e.g. Service"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-700 font-bold text-center text-lg">
              ⚠️ {error}
            </p>
          )}
          <div className="flex justify-center gap-3 flex-wrap pt-2">
            <button
              className="wmw-btn"
              type="submit"
              disabled={register.isPending}
            >
              {register.isPending ? "Registering..." : "Submit 📨"}
            </button>
            <Link to="/" className="wmw-btn">🏠 Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

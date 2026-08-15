import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex justify-center px-4 py-8 min-h-screen">
      <div className="wmw-card w-full max-w-[700px] p-6 sm:p-8 h-fit">
        <h1 className="gradient-title text-center text-4xl sm:text-6xl leading-tight">
          What's My WhatsApp?
        </h1>
        <br />
        <p className="text-xl text-justify">
          <span className="text-[#097d70] font-bold italic text-2xl">
            WhatsApp
          </span>{" "}
          is an INCREDIBLE communication tool used worldwide. But if people
          can't remember your long WhatsApp number, they won't be able to add
          you to their contacts list.
        </p>
        <p className="text-xl text-justify mt-2">
          Country code, region code, area code, dialing code, ISO code...
        </p>
        <p className="text-center text-4xl mt-3">😵😵😵</p>
        <p className="text-center text-2xl font-bold">
          It's all too damn much !!
        </p>
        <p className="text-xl text-justify mt-3">
          <span className="text-[#097d70] font-bold italic text-2xl">
            WhatsMyWhatsApp
          </span>{" "}
          is here to make it all better! Our app associates your WhatsApp
          number with a set of 3 easily remembered words of your choice.
        </p>
        <p className="text-center text-2xl font-bold mt-3">
          ♾️ Permanently! ♾️
        </p>
        <p className="text-xl text-justify mt-3">
          <span className="text-[#097d70] font-bold italic text-2xl">
            These 3 words
          </span>{" "}
          can then be used by anyone to look up your info and add you to their
          contacts list.
        </p>
        <p className="text-center text-4xl mt-3">😃😃😃</p>
        <p className="text-center text-2xl font-bold">Wow !!</p>
        <p className="text-xl mt-3">
          <span className="text-[#097d70] font-bold italic text-2xl">
            To get started
          </span>
          , choose between these two options...
        </p>
        <div className="flex justify-around mt-6 flex-wrap gap-3">
          <Link to="/get" className="wmw-btn">
            🤲 Get
          </Link>
          <Link to="/lookup" className="wmw-btn">
            🔍 Look Up
          </Link>
        </div>
      </div>
    </div>
  );
}

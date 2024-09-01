import { useState } from "react";

export default function SearchBar(props) {
    const [word, setWord] = useState("");

    async function getSimilarChannels(targetChannel) {
        const url = `http://127.0.0.1:8000/get_similar_channels/${targetChannel}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            props.updateSimilarChannels(data.similar_channels);
        } catch (error) {
            console.error("Error fetching similar channels:", error);
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                getSimilarChannels(word);
            }}
            className="flex justify-center w-full relative"
        >
            <div className="relative flex items-center w-full max-w-4xl">
                <input
                    autoFocus
                    placeholder="PewDiePie"
                    className="bg-gray-200 border-2 border-black rounded-full w-full px-4 py-2 text-gray-800"
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <button
                    type="submit"
                    className="border-t-2 border-r-2 border-b-2 border-black absolute right-0 top-0 bottom-0 flex items-center justify-center p-4 text-sm font-medium text-white bg-red-600 rounded-r-full hover:bg-red-500"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </form>
    );
}

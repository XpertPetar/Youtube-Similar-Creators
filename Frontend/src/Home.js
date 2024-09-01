import SearchBar from "./components/SearchBar";
import { FaYoutube } from "react-icons/fa";
import Slider from "./components/Slider";
import { useState } from "react";

export default function Home() {
    const [simiarChannels, setSimilarChannels] = useState();

    function updateSimilarChannels(newValue) {
        setSimilarChannels(newValue);
    }

    return (
        <>
            <div className="max-w-7xl mx-auto poppins-medium">
                <div className="mb-24 lg:mt-32 p-2">
                    <FaYoutube size={100} color="red" className="mb-2 mx-auto" />
                    <h1 className="text-center text-6xl mb-24">Youtube Similar Creators</h1>

                    <SearchBar updateSimilarChannels={updateSimilarChannels}></SearchBar>
                </div>

                <div>
                    {simiarChannels ? (
                        <div className="flex justify-center flex-wrap gap-2">
                            <Slider simiarChannels={simiarChannels}></Slider>
                        </div>
                    ) : (
                        <div className="flex justify-center flex-wrap gap-2">
                            {" "}
                            <div className="w-full m-2 lg:m-0 lg:w-72 h-64 border-2 border-black bg-gray-300 relative overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="w-full h-1/2 bg-gray-400 animate-pulse"></div>
                                {/* Channel Info */}{" "}
                                <div className="flex flex-col items-center justify-center h-1/2 p-4 space-y-2">
                                    {" "}
                                    <div className="w-20 h-20 bg-gray-400 rounded-full animate-pulse"></div>{" "}
                                    {/* Placeholder for channel avatar */}{" "}
                                    <div className="w-32 h-6 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for channel name */}{" "}
                                    <div className="w-full h-8 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for some text */}{" "}
                                </div>{" "}
                            </div>{" "}
                            <div className="w-full m-2 lg:m-0 lg:w-72 h-64 border-2 border-black bg-gray-300 relative overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="w-full h-1/2 bg-gray-400 animate-pulse"></div>
                                {/* Channel Info */}{" "}
                                <div className="flex flex-col items-center justify-center h-1/2 p-4 space-y-2">
                                    {" "}
                                    <div className="w-20 h-20 bg-gray-400 rounded-full animate-pulse"></div>{" "}
                                    {/* Placeholder for channel avatar */}{" "}
                                    <div className="w-32 h-6 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for channel name */}{" "}
                                    <div className="w-full h-8 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for some text */}{" "}
                                </div>{" "}
                            </div>{" "}
                            <div className="w-full m-2 lg:m-0 lg:w-72 h-64 border-2 border-black bg-gray-300 relative overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="w-full h-1/2 bg-gray-400 animate-pulse"></div>
                                {/* Channel Info */}{" "}
                                <div className="flex flex-col items-center justify-center h-1/2 p-4 space-y-2">
                                    {" "}
                                    <div className="w-20 h-20 bg-gray-400 rounded-full animate-pulse"></div>{" "}
                                    {/* Placeholder for channel avatar */}{" "}
                                    <div className="w-32 h-6 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for channel name */}{" "}
                                    <div className="w-full h-8 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for some text */}{" "}
                                </div>{" "}
                            </div>{" "}
                            <div className="w-full m-2 lg:m-0 lg:w-72 h-64 border-2 border-black bg-gray-300 relative overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="w-full h-1/2 bg-gray-400 animate-pulse"></div>
                                {/* Channel Info */}{" "}
                                <div className="flex flex-col items-center justify-center h-1/2 p-4 space-y-2">
                                    {" "}
                                    <div className="w-20 h-20 bg-gray-400 rounded-full animate-pulse"></div>{" "}
                                    {/* Placeholder for channel avatar */}{" "}
                                    <div className="w-32 h-6 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for channel name */}{" "}
                                    <div className="w-full h-8 bg-gray-400 rounded animate-pulse"></div>{" "}
                                    {/* Placeholder for some text */}{" "}
                                </div>{" "}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

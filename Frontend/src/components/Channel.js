import React from "react";

export default function Channel({ channel }) {
    // Display real data
    return (
        <>
            <a className="cursor-pointer" href={channel.url}>
                <div className="w-full m-2 lg:m-0 lg:w-72 h-64 border-2 border-black bg-gray-300 relative overflow-hidden pb-10">
                    <img
                        src={channel.avatar}
                        alt={channel.channel_title}
                        className="w-full h-1/2 object-cover"
                    />

                    <div className="flex flex-col items-center justify-center h-1/2 p-4 space-y-2">
                        <img
                            src={channel.avatar}
                            alt={channel.channel_title}
                            className="w-20 h-20 rounded-full"
                        />{" "}
                        <div className="text-lg font-semibold">{channel.channel_title}</div>{" "}
                        <a href={channel.url} className="text-blue-600 underline text-sm">
                            {channel.url}
                        </a>{" "}
                    </div>
                </div>
            </a>
        </>
    );
}

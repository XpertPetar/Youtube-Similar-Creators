import React from "react";
import Channel from "./Channel";

export default function Slider(props) {
    const { simiarChannels } = props;

    return (
        <div className="flex overflow-x-scroll">
            {simiarChannels &&
                simiarChannels.map((channel, index) => <Channel key={index} channel={channel} />)}
        </div>
    );
}

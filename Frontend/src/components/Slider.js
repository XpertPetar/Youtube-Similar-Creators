// import Channel from "./Channel";

// export default function Slider(props) {
//     return (
//         <>
//             <div className="flex flex-wrap justify-center gap-1">
//                 {props.similarChannels
//                     ? props.similarChannels.map((channel) => {
//                           return <Channel channel={channel}></Channel>;
//                       })
//                     : null}
//             </div>
//         </>
//     );
// }
import React from "react";
import Channel from "./Channel"; // Assuming you have a Channel component

export default function Slider(props) {
    const { simiarChannels } = props;

    return (
        <div className="flex overflow-x-scroll">
            {simiarChannels &&
                simiarChannels.map((channel, index) => <Channel key={index} channel={channel} />)}
        </div>
    );
}

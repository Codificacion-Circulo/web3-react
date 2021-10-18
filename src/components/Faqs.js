import React from "react";
import Faq from "react-faq-component";
import './Faqs.css'

const data = {
    rows: [
        {
            title: "Where is the data stored ?",
            content: `   The data is stored in IPFS which is like a decentralized cloud based system. You can read more about IPFS above.`,
        },
        {
            title: "Why is fees requiered to convert my writeup to a decentralized asset ?",
            content: `For stroing the article on blockchain a asset needs to be minted and thus minitng fees and gas fees is required to be payed for creating a asset`,
        },
        {
            title: "Where will my article go once I mint it ?",
            content: `Your article will go to the blockchain via IPFS, and will forever be there`,
        },
        {
            title: "What do you mean by I am the owner of data ?",
            content: `We at WriteUp is in no control of your data as we dont store it on our own server and thus you get full copyright of your data and if someone tries to copy your data you could give a proof this data is yours with IPFS hash.`,
        }
    ]
};

const styles = {
    rowTitleTextSize: '1.2rem',
    rowTitleColor: "blue",
    rowContentColor: 'black',
    rowContentTextSize: '1.3rem',
    arrowColor: "#1B04A1",
};

const config = {
    animate: true,
    arrowIcon: "V",
    tabFocus: true
};

const Faqs = props => {
    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
};

export default Faqs;
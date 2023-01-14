import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// const TELEGRAM_WRAPPER = require('./telegram.js');
// let telegramWraper = new TELEGRAM_WRAPPER({ddcabotParent: dcaBot})

async function test() {
    console.log("test");
    let result = getBotUpdates();
}

const getBotUpdates = () =>
    fetch(
        "https://api.telegram.org/bot5389030729:AAF9fnNmzr2wf-B0PMgax0yDowu0DUILZYQ/getUpdates"
    ).then((response) => {
        console.log("response", response);
        return response.json();
    });

    // const getUserTelegramId = async (uniqueString) => {
    //   const { result } = await getBotUpdates();

    //   const messageUpdates = result.filter(
    //     ({ message }) => message?.text !== undefined
    //   );

    //   const userUpdate = messageUpdates.find(
    //     ({ message }) => message.text === `/start ${uniqueString}`
    //   );

    //   return userUpdate.message.from.id;
    // };

    type Link = {
        id: number;
        href: string;
        src: string;
        name: string;
    };
    type Service = {
        id: number;
        domain: number;
        hosting: number;
        ssl: number;
        ownership: number;
        languages: number;
        seo: number;
        pages: number;
        searchbar: number;
        socialmedia: number;
        products: number;
        posts: number;
        website: number;
        app: number;
    };

function Gallery({
    links, services,
}: { links: Link[], services: Service[] }) {
// new TELEGRAM_WRAPPER({});

    return (
    <div className="body pos-rel flex-col flex-justify-start">

        <div className="bg-glass-6 w-100px pos-abs bord-r-10 tx-white py-100 z-999 fade-in w-1080px flex-center"
            style={{
                transform:"translateY(200px)", border:"1px solid #777",
                boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <h1 className="tx-xl flex-col flex-align-start mr-100 " >
                <span>Full-Stack</span>
                <span>Multi-Platform</span>
                <span>Software Development</span>
            </h1>
            <a className="duno-btn py-4 px-8 bord-r-50 tx-lg"
                href="https://duno.vercel.app/contact"
                style={{boxShadow:"0px 0px 25px #CF589433"}}
            >
                Contact Us
            </a>
        </div>

        {/* Images will go here */}
        <div className="flex-col flex-justify-center huerotate-1  tx-white" >
            <div className="w-400px hover-4 ">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" >
                      <path  fill="#CF5894"
                          d={
"M44.8,-72.3C56.8,-70.6,64.5,-56.1,70.7,-41.9C76.9,-27.8,81.7,-13.9,81.3,"+
"-0.2C80.9,13.4,75.3,26.9,64.3,32.7C53.3,38.5,36.8,36.8,25.1,41.5C13.5,46.2,6.8,57.4,-2.7,"+
"62C-12.1,66.6,-24.2,64.7,-35.6,59.9C-47,55,-57.7,47.3,-58.5,36.8C-59.3,26.4,-50.2,13.2,-50.3,-0.1C-50.4,-13.3,-59.7,-26.6,-58,"+
"-35.4C-56.2,-44.2,-43.4,-48.6,-31.9,-50.6C-20.4,-52.5,-10.2,-52.1,3.1,-57.5C16.4,-62.8,32.7,-74,44.8,-72.3Z"
                          }
                          transform="translate(100 100)"
                          />
                </svg>
            </div>






            <div className="mt-200"></div>
            <h1 className="mt-200 pt-200 tx-xxxl opaci-5 tx-ls-8 flex-col" onClick={() => { test(); }}>
                <span>DEVELOPMENT</span>
                <span>PLANS</span>
            </h1>

            <div className=" w-1080px pos-rel flex-col ">
                <div className=" w-700px pos-abs opaci-25 pump-20" style={{ filter: "blur(5px) brightness(180%)" }}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#CF5894" d="M40.8,-56.9C54.5,-54.6,68.6,-46.2,78.1,-33.3C87.7,-20.5,92.8,-3.2,89.7,12.3C86.6,27.9,75.3,41.7,61.6,48.2C47.9,54.7,31.8,54,18.4,53.9C5.1,53.8,-5.5,54.3,-13.8,50.3C-22,46.3,-27.9,37.8,-37.4,30.4C-46.8,23,-59.9,16.8,-66.7,6.2C-73.5,-4.4,-74.1,-19.3,-64.8,-25.4C-55.5,-31.6,-36.2,-29,-23.8,-31.9C-11.3,-34.7,-5.7,-43.1,3.9,-49.2C13.5,-55.3,27,-59.1,40.8,-56.9Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="flex-wrap w-100 bg-glass-20   bord-r-10">
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">domain:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">hosting:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">ssl:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">ownership:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">languages:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">seo:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">pages:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">searchbar:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">socialmedia:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">products:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">posts:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">website:</div>
                    <div className="flex-1 px-1 py-4 tx-sm opaci-chov--50 tx-start">app:</div>
                </div>
                <div className="pos-rel w-100 bg-glass-6 bord-r-10 mt-2 px-2 mt-0 py-4">
                    {services.map((service) => (
                        <div key={service.id} className="">
                            <Service service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-200 pt-200"></div>

        <div className="flex-column mt-4 pb-200 ">
            <div className="tx-xl tx-white tx-ls-2 opaci-chov--10 ">
                <Link href="https://duno.vercel.app/contact" target="_blank">
                    <a>CONTACT US</a>
                </Link>
            </div>
            {links.map((link) => (
                <div key={link.id}>
                    <ContactLink link={link} />
                </div>
            ))}
        </div>

    </div>
    )
}

function HrH() {
    return (
        <hr/>
    )
}
function Service({ service }: { service: Service }) {
    const theArray = []
    return (
        <div className="text-bold-4   bord-r-10 noverflow block flex ">
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>domain:</div>*/}
                <div>{service.domain}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>hosting:</div>*/}
                <div>{service.hosting}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>ssl:</div>*/}
                <div>{service.ssl}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>ownership:</div>*/}
                <div>{service.ownership}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>languages:</div>*/}
                <div>{service.languages}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>seo:</div>*/}
                <div>{service.seo}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>pages:</div>*/}
                <div>{service.pages}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>searchbar:</div>*/}
                <div>{service.searchbar}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>socialmedia:</div>*/}
                <div>{service.socialmedia}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>products:</div>*/}
                <div>{service.products}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>posts:</div>*/}
                <div>{service.posts}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>website:</div>*/}
                <div>{service.website}</div>
            </div>
            <div className="flex-1 mt-1 px-1 pl-2 mr-1 bg-glass-50 opaci-chov--50 py-8">
                {/*<div>app:</div>*/}
                <div>{service.app}</div>
            </div>
        </div>
    )
}




function Image2() {
    return <i>Text</i>;
}
function ContactLink({ link }: { link: Link }) {
    return (
    <div className="flex-center opaci-75">
        <a
            href={link.href}
            className="text-bold-4 tx-lg py-2 px-4 block opaci-chov--50 tx-primary"
            target="_blank"
        >
            {link.name}
        </a>
    </div>
    )
}

export default Gallery;

export const getStaticProps = async () => {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    let links = (await supabaseAdmin.from("links").select("*").order("id")).data
    let asd = await supabaseAdmin.from("services").select("*")
    // console.log("asd")
    // console.log(asd)
    let services = (await supabaseAdmin.from("services").select("*").order("id")).data
    // console.table(links)
    // console.table(services)
    return {
        props: {
            links: links,
            services: services,
        },
    };
};

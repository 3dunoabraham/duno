import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'


// const TELEGRAM_WRAPPER = require('./telegram.js');
// let telegramWraper = new TELEGRAM_WRAPPER({ddcabotParent: dcaBot})

async function test() {
  console.log("test")
  let result = getBotUpdates()
}

const getBotUpdates = () =>
  fetch(
    "https://api.telegram.org/bot5389030729:AAF9fnNmzr2wf-B0PMgax0yDowu0DUILZYQ/getUpdates"
  ).then((response) => {
  console.log("response", response)
  return response.json()});

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
  id: number,
  href: string,
  src: string,
  name: string,
}

function Gallery({ links }: { links: Link[]}) {
  // new TELEGRAM_WRAPPER({})


  return (
    <div>
      <h1 onClick={() => { test() }}>Title</h1>

      
      {/* Images will go here */}
      <div className="flex-column">
        {links.map((link) => (
          <div key={link.id}>
            <CustomLink link={link} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Image2() {
  return (
    <i>Text</i>
  )
}
function CustomLink({ link }: { link: Link}) {
  return (
    <a href={link.href}
      className="text-blue-400 tx-xl pa-4  block"
      target="_blank">
        {link.name}
    </a>
  )
}

export default Gallery

export const getStaticProps = async () => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  )

  const { data } = await supabaseAdmin
  .from('images')
  .select('*')
  .order('id')

  console.log("data",data)

  // test()

  return {
    props: {
      links: data,
    },
  }
}
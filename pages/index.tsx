import Image from 'next/image'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'


async function test() {
  console.log("test")
  let result = getBotUpdates()
}

const getBotUpdates = () =>
  fetch(
    "https://api.telegram.org/bot5389030729:AAF9fnNmzr2wf-B0PMgax0yDowu0DUILZYQ/getUpdates"
  ).then((response) => {
  console.log("result", result)
  return response.json()});

const getUserTelegramId = async (uniqueString) => {
  const { result } = await getBotUpdates();

  const messageUpdates = result.filter(
    ({ message }) => message?.text !== undefined
  );

  const userUpdate = messageUpdates.find(
    ({ message }) => message.text === `/start ${uniqueString}`
  );

  return userUpdate.message.from.id;
};

type Image = {
  id: number,
  href: string,
  src: string,
  name: string,
}

function Gallery({ images }: { images: Image[]}) {
  return (
    <div>
      <h1 onClick={() => { test() }}>Title</h1>

      
      {/* Images will go here */}
      <div className="flex-column">
        {images.map((image) => (
          <div key={image.id}>
            <BlurImage image={image} />
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
function BlurImage({ image }: { image: Image}) {
  return (
    <i>{image.name}</i>
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
      images: data,
    },
  }
}
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { SearchBox } from '~/components/SearchBox';
import { getAvengers } from '~/models/avengers.server';
import { useState } from 'react';

export const loader = async () => {
  return json(await getAvengers());
}

export default function Index() {
  const [avenger, setAvenger] = useState(null);
  const avengers = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <SearchBox avengers={avengers} setAvenger={setAvenger}/>   
    </div>
  );
}

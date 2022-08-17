import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAvengers } from '~/models/avengers.server';

export const loader = async () => {
  return json(await getAvengers());
}

export default function Index() {
  const avengers = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>


      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>

        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <h2 className="text-4xl">List of avengers</h2>
      <ul className="list-disc">
        {avengers.map(({id, name}) => <li key={id}>{name}</li>)}
      </ul>        
    </div>
  );
}

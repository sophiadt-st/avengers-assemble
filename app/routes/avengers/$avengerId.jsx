import md5 from 'md5';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }) {
  const id = params.avengerId;
  const ts = +new Date();
  const hash = md5(ts+process.env.MARVEL_PRIVATE_API_KEY+process.env.MARVEL_PUBLIC_API_KEY);
  const api = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
  const res = await fetch(api);
  const payload = await res.json();
  const [avenger] = payload.data.results;
  return json(avenger);
}

// export function action({ params }) {
//   const id = params.avengerId;
// }

export default function Avenger() {
//   const { avengerId } = useParams();
  const {name, description} = useLoaderData();

  return (
    <>
        <div>Hello from {name}</div>
        <p>{description}</p>
        <Outlet />
    </>
  )
}
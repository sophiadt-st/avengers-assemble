import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from "@remix-run/react";
import { marvelApi } from '~/api/marvel-api';

export async function loader({ params }) {
  const id = params.avengerId;
  const payload = await marvelApi.characters(id).get();
  const [avenger] = payload.data.results;
  return json(avenger);
}

// export function action({ params }) {
//   const id = params.avengerId;
// }

export default function Avenger() {
  const {name, description} = useLoaderData();

  return (
    <>
        <div>Hello from {name}</div>
        <p>{description}</p>
        {/* <p>{thumbnail.path}.{thumbnail.extension}</p>  */}
        <Outlet />
    </>
  )
}
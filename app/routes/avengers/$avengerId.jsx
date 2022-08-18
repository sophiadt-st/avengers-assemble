import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
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
    const { name, description, comics, thumbnail } = useLoaderData();

    return (
        <>
            <div className="mt-6">
                <div className="flex gap-6 columns-2 mt-4 mb-6">
                    <div className="flex">
                        <div>
                            <div className="pl-2 mb-4">
                                <p className="text-2xl font-bold">{name}</p>
                            </div>
                            <img className='object-fill w-96'
                                src={`${thumbnail.path}.${thumbnail.extension}`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 mt-16 pt-8">
                        <div className="text-lg"><b>Available in: </b>{comics.available} comic books</div>
                        <div className="text-lg"><b>Description: </b>{description}</div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}

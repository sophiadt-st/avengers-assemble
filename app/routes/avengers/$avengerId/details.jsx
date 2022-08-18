import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { marvelApi } from '~/api/marvel-api';
import { getAvengersSeries } from '~/models/avengers.server';

export async function loader({ params }) {
    const id = params.avengerId;
    const promises = [];
    const series = await getAvengersSeries();
    for (const item of series) {
        promises.push(
            marvelApi.characters(id).comics.get({ series: item.id, limit: 5 })
        );
    }
    const payload = await Promise.all(promises);
    const result = [];
    for (const response of payload) {
        // if no data, skip
        if (!response.data.results.length) continue;
        const [first] = response.data.results;
        const serial = series.find((s) => s.value === first.series.name);
        result.push({
            id: serial.id,
            name: serial.value,
            comics: response.data.results,
        });
    }
    return json(result);
}

export default function Details() {
    const data = useLoaderData();
    return (
        <>
            {data.map((series) => {
                return (
                    <div key={series.id} className="mt-4 mb-8">
                        <div className='mt-14'>
                            <div className="bg-black text-white text-xl font-semibold p-2 mb-4">
                                {series.name}
                            </div>
                            <div className="flex gap-3 overflow-x-auto h-96">
                                {series.comics.map((comic) => {
                                    return (
                                        <div
                                            key={comic.id}
                                            className="max-w-sm bg-white rounded-lg h-full w-64"
                                        >
                                            <div className="h-full w-64">
                                                <img
                                                    className="rounded-t-lg max-w-full max-h-full object-contain"
                                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                                    alt=""
                                                />
                                            </div>
                                            {/* <div className="p-5 bg-black">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{comic.title}</h5>
                                        </div> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

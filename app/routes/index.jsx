import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAvengers } from '~/models/avengers.server';
import { DatalistInput, useComboboxControls } from 'react-datalist-input';
import { Form } from '@remix-run/react';

export const loader = async () => {
    return json(await getAvengers());
};

export async function action({ request }) {
    const body = await request.formData();
    const avengerName = body.get('hero');
    const avengersId = await findAvengerID(avengerName)
    return redirect(`/avengers/${avengersId}/details`);
}

async function findAvengerID(avengerName) {
  const avengers = await getAvengers()
  const avengersId = avengers.find(avenger => avenger.value === avengerName).id
  return avengersId
}

export default function Index() {
    const { setAvenger, avenger  } = useComboboxControls({ initialValue: "Black Panther" });
    const avengers = useLoaderData();

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div>
                <Form method="post">
                    <DatalistInput
                        inputProps={{
                          name: "hero"
                        }}
                        value={avenger}
                        setValue={setAvenger}
                        label="Search Avenger"
                        items={avengers}
                    />
                    <button type="submit">Search</button>
                </Form>
            </div>
        </div>
    );
}

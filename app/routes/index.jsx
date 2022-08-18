import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import { getAvengers } from '~/models/avengers.server';
import { DatalistInput, useComboboxControls } from 'react-datalist-input';

export const loader = async () => {
    return json(await getAvengers());
};

const validateSearch = (hero) => {
    if (!hero) {
      return "Must provide an avenger to search";
    }
  };

export async function action({ request }) {
    const { hero } = Object.fromEntries(await request.formData());
    const formErrors = {
        hero: validateSearch(hero),
    };
    //if there are errors, we return the form errors
    if (Object.values(formErrors).some(Boolean)) return { formErrors };
    const avengersId = await findAvengerID(hero)
    return redirect(`/avengers/${avengersId}/details`);
}

async function findAvengerID(avengerName) {
  const avengers = await getAvengers()
  const avengersId = avengers.find(avenger => avenger.value === avengerName).id
  return avengersId
}

export default function Index() {
    const { setAvenger, avenger } = useComboboxControls();
    const avengers = useLoaderData();
    const actionData = useActionData();

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }} className="flex justify-center">
            <div>
                <Form method="post" className="flex">
                    <DatalistInput
                        inputProps={{
                            name: "hero",
                            className: "border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 relative"
                        }}
                        listboxProps={{
                            className: "absolute"
                        }}
                        listboxOptionProps={{
                            className: "p-1 hover:bg-blue-700 hover:text-white"
                        }}
                        value={avenger}
                        setValue={setAvenger}
                        label="Search Avenger"
                        items={avengers}
                    />
                    <button type="submit"
                        className="p-2.5 h-10 ml-2 text-sm self-end font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </Form>
                {actionData?.formErrors?.hero ? (
                        <p style={{ color: "red" }}>{actionData?.formErrors?.hero}</p>
                ) : null}
            </div>
        </div>
    );
}

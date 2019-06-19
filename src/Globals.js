export const ValidateTypes = {
    required: 'required',
    phone: 'phone',
    email: 'email',
    match: 'match',
    date: 'date',
    time: 'time',
    number: 'number',
}
export const FieldTypes = {
    text: 'text',
    phone: 'phone',
    email: 'email',
    password: 'password',
    date: 'date',
    time: 'time',
    number: 'number',
}
let index = 0;
export const JobTypes = [
    { key: index++, label: "Blinding" },
    { key: index++, label: "Blockfill" },
    { key: index++, label: "Columns" },
    { key: index++, label: "Driveway" },
    { key: index++, label: "Footings" },
    { key: index++, label: "Foundations" },
    { key: index++, label: "Pathways" },
    { key: index++, label: "Paving" },
    { key: index++, label: "Piers" },
    { key: index++, label: "Pits" },
    { key: index++, label: "Slab" },
    { key: index++, label: "Stumps" },
    { key: index++, label: "Wall" },
    { key: index++, label: "Other" },
];

index = 0;
export const Mpa_Strengths = [
    { key: index++, label: '20 MPA' },
    { key: index++, label: '25 MPA' },
    { key: index++, label: '32 MPA' },
    { key: index++, label: '40 MPA' },
    { key: index++, label: 'Other' },
];

index = 0;
export const Stone_Sizes = [
    { key: index++, label: ' 7 mm' },
    { key: index++, label: '14 mm' },
    { key: index++, label: '20 mm' },
    { key: index++, label: 'Other' },
];

index = 0;
export const Slump_Wetness = [
    { key: index++, label: '80 Standard' },
    { key: index++, label: '90' },
    { key: index++, label: '100' },
    { key: index++, label: '120' },
    { key: index++, label: 'Other' },
];

export const initQuoteState = {
    submitted: false,
    fields: {
        orderType: { value: 'Order', error: false, },
        delivery_date: { value: '', error: true, },
        delivery_address: { value: '', error: true, },
        suburb: { value: '', error: true, },

        company_name: { value: '', error: true, },
        customer_name: { value: '', error: true, },
        phone: { value: '', error: true, },
        email: { value: '', error: true, },

        pumpRequired: { value: false, error: false, },
        quantity: { value: '', error: false },
        job_type: { value: JobTypes[0].label, error: false },

        mpa_strength: { value: Mpa_Strengths[0].label, error: false },
        stone_size: { value: Stone_Sizes[0].label, error: false },
        slump_wetness: { value: Slump_Wetness[0].label, error: false },

        note: { value: '', error: false },

    },
    order_radio_props: [
        { label: 'Order', value: 0 },
        { label: 'Quote', value: 1 }
    ],
    pump_radio_props: [
        { label: 'Yes', value: 0 },
        { label: 'No', value: 1 }
    ],
    multilineHeight: 100,
}

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
export const Mpa_Strengths = [
    { key: index++, label: '20 MPA' },
    { key: index++, label: '25 MPA' },
    { key: index++, label: '32 MPA' },
    { key: index++, label: '40 MPA' },
    { key: index++, label: 'Other' },
];
export const Stone_Sizes = [
    { key: index++, label: ' 7 mm' },
    { key: index++, label: '14 mm' },
    { key: index++, label: '20 mm' },
    { key: index++, label: 'Other' },
];
export const Slump_Wetness = [
    { key: index++, label: '80 Standard' },
    { key: index++, label: '90' },
    { key: index++, label: '100' },
    { key: index++, label: '120' },
    { key: index++, label: 'Other' },
];

import Schema from 'jsonschema';

const nfSchema = {
    "id": "/Nf",
    "type": "object",
    "properties": {
        "nfeId": { "type": "string" },
        "currency": { "type": "string" },
        "value": { "type": "string" },
        "entries": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "productName": { "type": "string" },
                    "unit": { "type": "string" },
                    "unitValue": { "type": "string" },
                    "ammount": { "type": "number" },
                    "value": { "type": "string" },
                },
                "required": ["productName", "unit", "unitValue", "ammount", "value"]
            }
        }
    },
    "required": ["currency", "entries"]
};

export function nfFromJSON(jsonString) {
    const object = JSON.parse(jsonString);
    const res = validateNf(object);
    if (!res.valid) {
        throw Error('Invalid JSON');
    } else {
        return object;
    }
}

export function validateNf(object) {
    return Schema.validate(object, nfSchema);
}
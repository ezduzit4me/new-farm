import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Resident: a
    .model({
      name:a.string(),
      apartment_no: a.string(),
      move_in_date: a.date(),
      mobile_phone: a.string(),
      parking_no: a.string(),
      vehicle_rego: a.string(),
      pet_type: a.string(),
      pet_weight: a.string(),
      storage_no: a.string(),
      re_name: a.string(),
      re_mobile: a.string(),
      re_email: a.string(),

    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
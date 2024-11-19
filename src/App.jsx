import { useState, useEffect } from "react";

import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    client.models.Expense.observeQuery().subscribe({
      next: (data) => setExpenses([...data.items]),
    });
  }, []);


  async function createResident(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    await client.models.Resident.create({
      name: form.get("name"),
      apartment_no: form.get("apartment_no"),
      move_in_date: form.get("move_in_date"),
      mobile_phone: form.get("mobile_phone"),
      parking_no: form.get("parking_no"),
      vehicle_rego: form.get("vehicle_rego"),
      pet_type: form.get("pet_type"),
      pet_weight: form.get("pet_weight"),
      storage_no: form.get("storage_no"),
      re_name: form.get("re_name"),
      re_mobile: form.get("re_mobile"),
      re_email: form.get("re_email"),
    });

    event.target.reset();
  }

  async function deleteResident({ id }) {
    const toBeDeletedResident = {
      id,
    };

    await client.models.Resident.delete(toBeDeletedResident);
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          <Heading level={1}>Resident Tracker</Heading>
          <View as="form" margin="3rem 0" onSubmit={createResident}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                name="name"
                placeholder="
                Name"
                label="Name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="apartment_no"
                placeholder="Apartment Number"
                label="Apartment Number"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="move_in_date"
                placeholder="Move In Date"
                label="Move In Date"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="mobile_phone"
                placeholder="Mobile Phone"
                label="Mobile Phone"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="parking_no"
                placeholder="Parking Number"
                label="Parking Number"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="vehicle_rego"
                placeholder="Vehicle Registration"
                label="Vehicle Registration"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="pet_type"
                placeholder="Pet Type"
                label="Pet Type"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
               <TextField
                name="pet_weight"
                placeholder="Pet weight"
                label="Pet Weight"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
               <TextField
                name="storage_no"
                placeholder="Storage number"
                label="Storage number"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
               <TextField
                name="re_name"
                placeholder="Agents Name"
                label="Agents Name"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
               <TextField
                name="re_mobile"
                placeholder="Agents Mobile"
                label="Agents Mobile"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
               <TextField
                name="re_email"
                placeholder="Agents Email"
                label="Agents Email"
                type="string"
                labelHidden
                variation="quiet"
                required
              />
             <Button type="submit" variation="primary">
                Submit
              </Button>
            </Flex>
          </View>
          <Divider />
         
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator>
  );
}
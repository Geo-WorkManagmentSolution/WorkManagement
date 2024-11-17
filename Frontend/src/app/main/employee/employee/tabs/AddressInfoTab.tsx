/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { TextField } from '@mui/material';
// import { Controller, useFormContext } from 'react-hook-form';

// /**
//  * The basic info tab.
//  */
// function AddressInfoTab() {
// 	const methods = useFormContext();
// 	const { control, formState } = methods;
// 	const { errors } = formState;

// 	return (
// 		<div className="space-y-48">
// 			<div className="space-y-16">
// 				<Controller
// 					name="employeeAddresses.addressLine1"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Address Line 1"
// 							fullWidth
// 							required
// 							error={!!errors.employeeAddresses?.addressLine1}
// 							helperText={errors.employeeAddresses?.addressLine1?.message as string}
// 						/>
// 					)}
// 				/>

// 				<Controller
// 					name="employeeAddresses.addressLine2"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Address Line 2"
// 							fullWidth
// 							error={!!errors.employeeAddresses?.addressLine2}
// 							helperText={errors.employeeAddresses?.addressLine2?.message as string}
// 						/>
// 					)}
// 				/>

// 				<div className="flex -mx-4">
// 					<Controller
// 						name="employeeAddresses.city"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								className="mx-4"
// 								label="City"
// 								fullWidth
// 								required
// 								error={!!errors.employeeAddresses?.city}
// 								helperText={errors.employeeAddresses?.city?.message as string}
// 							/>
// 						)}
// 					/>

// 					<Controller
// 						name="employeeAddresses.state"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								label="State"
// 								fullWidth
// 								required
// 								className="mx-4"
// 								error={!!errors.employeeAddresses?.state}
// 								helperText={errors.employeeAddresses?.state?.message as string}
// 							/>
// 						)}
// 					/>

// 					<Controller
// 						name="employeeAddresses.country"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								label="Country"
// 								fullWidth
// 								className="mx-4"
// 								required
// 								error={!!errors.employeeAddresses?.country}
// 								helperText={errors.employeeAddresses?.country?.message as string}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<Controller
// 					name="employeeAddresses.pinCode"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Pin Code"
// 							fullWidth
// 							required
// 							type="number"
// 							error={!!errors.employeeAddresses?.pinCode}
// 							helperText={errors.employeeAddresses?.pinCode?.message as string}
// 						/>
// 					)}
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// export default AddressInfoTab;

// 'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { FormControl } from "@mui/base";
import { Autocomplete } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const countries = [
  {
    name: "USA",
    states: [
      "California",
      "Texas",
      "New York",
      "Florida",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
    ],
  },
  {
    name: "India",
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
  },
];

const cities = {
  California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
  Texas: ["Houston", "Austin", "Dallas", "San Antonio"],
  "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
  Illinois: ["Chicago", "Aurora", "Naperville", "Joliet"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
  Georgia: ["Atlanta", "Augusta", "Columbus", "Savannah"],
  "North Carolina": ["Charlotte", "Raleigh", "Durham", "Greensboro"],
  Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights"],

  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Manipur: ["Imphal", "Bishnupur", "Thoubal", "Ukhrul"],
  Meghalaya: ["Shillong", "Cherrapunji", "Tura", "Jowai"],
  Mizoram: ["Aizawl", "Lunglei", "Serchhip", "Champhai"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"],
  Sikkim: ["Gangtok", "Gyalshing", "Namchi", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
};

export default function AddressInfoTab() {
  const methods = useFormContext();
  const { control, watch, setValue, formState } = methods;
  const { errors } = formState;

  const useUserAddressForMailing = watch(
    "employeeAddresses.useUserAddressForMailing"
  );
  const country = watch("employeeAddresses.userAddress.country");
  const state = watch("employeeAddresses.userAddress.state");

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    const selectedCountry = countries.find((c) => c.name === country);

    if (selectedCountry) {
      setAvailableStates(selectedCountry.states);
      setValue("employeeAddresses.userAddress.state", null);
      setValue("employeeAddresses.userAddress.city", null);
    } else {
      setAvailableStates([]);
      setValue("employeeAddresses.userAddress.state", null);
      setValue("employeeAddresses.userAddress.city", null);
    }

    setAvailableCities([]);
  }, [country, setValue]);

  useEffect(() => {
    if (state) {
      setAvailableCities(cities[state] || []);
      setValue("employeeAddresses.userAddress.city", null);
    } else {
      setAvailableCities([]);
      setValue("employeeAddresses.userAddress.city", null);
    }
  }, [state, setValue]);

  const memoizedAddressFields = useMemo(() => {
    return function ({ prefix, sectionLabel }) {
      return (
        <AddressFields
          prefix={prefix}
          sectionLabel={sectionLabel}
          country={country}
          state={state}
          availableStates={availableStates}
          availableCities={availableCities}
        />
      );
    };
  }, [country, state, availableStates, availableCities]);

  function AddressFields({
    prefix,
    sectionLabel,
  }: {
    prefix:
      | "employeeAddresses.userAddress"
      | "employeeAddresses.mailingAddress";
    sectionLabel: string;
  }) {
    return (
      <div className="space-y-16">
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:home
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            {sectionLabel}
          </Typography>
        </div>
        <Controller
          name={`${prefix}.addressLine1`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Address Line 1"
              error={!!error}
              helperText={error?.message}
              // inputRef={prefix === 'employeeAddresses.userAddress' ? userAddressRef : mailingAddressRef}
            />
          )}
        />
        <Controller
          name={`${prefix}.addressLine2`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Address Line 2"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Country Selector */}
          <FormControl>
            <Controller
              name={`${prefix}.country`}
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={countries.map((c) => c.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                  onChange={(_, data) => onChange(data)}
                  value={value || null}
                />
              )}
            />
          </FormControl>

          {/* State Selector - Enabled only when a country is selected */}
          <FormControl disabled={!country}>
            <Controller
              name={`${prefix}.state`}
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={availableStates}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                  onChange={(_, data) => onChange(data)}
                  value={value || null}
                  disabled={!country}
                />
              )}
            />
          </FormControl>

          {/* City Selector - Enabled only when a state is selected */}
          <FormControl disabled={!state}>
            <Controller
              name={`${prefix}.city`}
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Autocomplete
                  {...rest}
                  options={availableCities}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                  onChange={(_, data) => onChange(data)}
                  value={value || null}
                  disabled={!state}
                />
              )}
            />
          </FormControl>
        </div>

        <Controller
          name={`${prefix}.pinCode`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Pincode"
              type="number"
              error={!!errors.employeeAddresses?.pinCode}
              helperText={errors.employeeAddresses?.pinCode?.message as string}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className="space-y-48">
      {memoizedAddressFields({
        prefix: "employeeAddresses.userAddress",
        sectionLabel: "Residence Address",
      })}
      <Controller
        name="employeeAddresses.useUserAddressForMailing"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} />}
            label="Use the same address for mailing"
          />
        )}
      />
      {!useUserAddressForMailing &&
        memoizedAddressFields({
          prefix: "employeeAddresses.mailingAddress",
          sectionLabel: "Mailing Address",
        })}
    </div>
  );
}

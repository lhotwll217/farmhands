import { useField } from "formik";
import {
  FormField,
  Label,
  List,
  ListItem,
  Segment,
  ListHeader,
} from "semantic-ui-react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { getSuggestedQuery } from "@testing-library/dom";

export default function MyPlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setErrors(error));
  }

  return (
    <PlacesAutocomplete
      value={field.value["address"]}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOtions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
          <input {...getInputProps({ name: field.name })} {...props} />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error}
            </Label>
          ) : null}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                positions: "absolute",
                zIndex: 1000,
                width: "100%",
              }}
            >
              <List selection>
                {suggestions.map((suggestion) => (
                  <ListItem {...getSuggestionItemProps(suggestion)}>
                    <ListHeader>
                      {suggestion.formattedSuggestion.mainText &&
                        console.log(suggestion)}
                    </ListHeader>
                  </ListItem>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
}

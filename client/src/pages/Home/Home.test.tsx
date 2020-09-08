import "mutationobserver-shim"; // related to https://github.com/testing-library/react-testing-library/issues/731
import { MockedProvider } from "@apollo/react-testing";
import React from "react";
import { theme } from "theme";
import { Home } from "pages/Home/Home";
import { ThemeProvider } from "@material-ui/core";
import { GET_OLD_BUSINESS } from "pages/Home/queries/GetOldBusinessQuery";
import { render, screen, fireEvent } from "@testing-library/react";
import { GET_MOST_LOCATIONS_BUSINESS } from "pages/Home/queries/GetMostLocationsBusinessQuery";
import { act } from "react-dom/test-utils";

const getOldBusinessMock = {
  request: {
    query: GET_OLD_BUSINESS,
    variables: {},
  },
  result: {
    data: {
      oldestBusiness: {
        locationAccount: "0000000943-0002-9",
        businessName: "ABILITYFIRST",
        dbaName: null,
        streetAdress: "3812 S GRAND AVENUE",
        city: "LOS ANGELES",
        zipCode: "90037-1336",
        locationDescription: "3812 GRAND 90037-1336",
        mailingAddress: "1300 E GREEN STREET",
        mailingCity: "PASADENA",
        mailingZipCode: "91106-2606",
        naics: "624100",
        primaryNaicsDescription: "Individual & family services",
        councilDistrict: "9",
        locationStartDate: "1943-08-09T03:00:00.000Z",
        location: {
          latitude: 34.0149,
          longitude: -118.2794,
          __typename: "Location",
        },
        __typename: "Business",
      },
    },
  },
};

const getMostLocationsBusinessMock = {
  request: {
    query: GET_MOST_LOCATIONS_BUSINESS,
    variables: {},
  },
  result: {
    data: {
      businessMostLocations: [
        {
          locationAccount: "0000001436-0002-5",
          businessName: "SP PLUS CORPORATION",
          dbaName: "LOT #80961",
          streetAdress: "3575 CAHUENGA BLVD W",
          city: "LOS ANGELES",
          zipCode: "90068-1366",
          locationDescription: "3575 CAHUENGA 90068-1366",
          mailingAddress: "3470 WILSHIRE BLVD SUITE #400",
          mailingCity: "LOS ANGELES",
          mailingZipCode: "90010-2207",
          naics: null,
          primaryNaicsDescription: null,
          councilDistrict: "4",
          locationStartDate: "2004-11-01T03:00:00.000Z",
          location: {
            latitude: 34.1339,
            longitude: -118.358,
            __typename: "Location",
          },
          __typename: "Business",
        },
        {
          locationAccount: "0000001436-0004-1",
          businessName: "SP PLUS CORPORATION",
          dbaName: "#81032 | LOT #81032",
          streetAdress: "1000 ELYSIAN PARK AVENUE",
          city: "LOS ANGELES",
          zipCode: "90012-1112",
          locationDescription: "1000 ELYSIAN PARK 90012-1112",
          mailingAddress: "3470 WILSHIRE BLVD SUITE #400",
          mailingCity: "LOS ANGELES",
          mailingZipCode: "90010-2207",
          naics: null,
          primaryNaicsDescription: null,
          councilDistrict: "1",
          locationStartDate: "2005-04-02T03:00:00.000Z",
          location: {
            latitude: 34.0739,
            longitude: -118.2399,
            __typename: "Location",
          },
          __typename: "Business",
        },
        {
          locationAccount: "0000001436-0010-6",
          businessName: "SP PLUS CORPORATION",
          dbaName: "LOT #80383",
          streetAdress: "3440 WILSHIRE BLVD",
          city: "LOS ANGELES",
          zipCode: "90010-2101",
          locationDescription: "3440 WILSHIRE 90010-2101",
          mailingAddress: "3470 WILSHIRE BLVD SUITE #400",
          mailingCity: "LOS ANGELES",
          mailingZipCode: "90010-2207",
          naics: "812930",
          primaryNaicsDescription: "Parking lots & garages",
          councilDistrict: "10",
          locationStartDate: "1998-10-05T03:00:00.000Z",
          location: {
            latitude: 34.0617,
            longitude: -118.2988,
            __typename: "Location",
          },
          __typename: "Business",
        },
      ],
    },
  },
};
describe("<Home />", () => {
  test("should render with the correct values", async () => {
    const { getByTestId, getByText, container } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={[getOldBusinessMock]}>
          <Home />
        </MockedProvider>
      </ThemeProvider>
    );

    expect(getByTestId("loader")).toBeDefined();

    await screen.findByTestId("card-business");

    expect(getByText("ABILITYFIRST")).toBeDefined();
    expect(getByText("624100")).toBeDefined();
    expect(getByText("90037-1336")).toBeDefined();
    expect(getByText("8/9/1943")).toBeDefined();
  });

  test("should show the `GET_MOST_LOCATIONS_BUSINESS` result query", async () => {
    const { getByTestId, getByText, container, findByTitle } = render(
      <ThemeProvider theme={theme}>
        <MockedProvider
          mocks={[getOldBusinessMock, getMostLocationsBusinessMock]}
        >
          <Home />
        </MockedProvider>
      </ThemeProvider>
    );

    expect(getByTestId("loader")).toBeDefined();

    const button = await findByTitle("Business with the most locations");
    act(() => {
      fireEvent.click(button);
    });
    await screen.findByTestId("card-business");
    expect(getByText("SP PLUS CORPORATION")).toBeDefined();
  });
});

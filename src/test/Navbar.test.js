import React from "react";
import { render } from "@testing-library/react";
import Footer from "../components/footer/Footer";

test("renders footer text", () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText("Copyright Mariusz Marszałek @2023");
    expect(footerText).toBeInTheDocument();
});

test("has the correct class", () => {
    const { container } = render(<Footer />);
    const footerDiv = container.querySelector(".footer");
    expect(footerDiv).toBeInTheDocument();
});
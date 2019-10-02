import React from "react"
import FeatureCard from "../views/Home/FeatureCard"
import renderer from "react-test-renderer"
it("renders correctly", () => {
  const tree = renderer.create(<FeatureCard />).toJSON()
  expect(tree).toMatchSnapshot()
})

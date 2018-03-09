import Factory, {div, h1, li, p, strong, ul} from "../builder";

export const basicTree = div({lang: "sv"}, [
  h1("Wow this is cool"),
  div([
    p("yeah, well, hihi!"),
    p(["This is", strong("really"), "dumb!"]),
    Factory("hr")(),
    ul([
      li("make the bed"),
      li({class: "important"}, strong("DO THE DISHES")),
      li("take out trash"),
    ]),
  ]),
]);

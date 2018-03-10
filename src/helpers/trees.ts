import Factory, {div, h1, li, p, strong, table, tbody, td, th, thead, tr, ul} from "../builder";

export const basicTree = div({lang: "sv"},
  h1("Wow this is cool"),
  div(
    p("yeah, well, hihi!"),
    p(["This is", strong("really"), "dumb!"]),
    Factory("hr")(),
    ul(
      li("make the bed"),
      li({class: "important"}, strong("DO THE DISHES")),
      li("take out trash"),
    ),
  ),
);

export const bigTable = div(
  {lang: "en-uk"},
  h1("User data"),
  p("Loaded from the DB for you!"),
  table(
    thead(
      tr(
        th("Name"), th("Superpower"), th("Quote"),
      ),
    ),
    tbody(
      tr(
        td({"data-uid": "david"}, "David"),
        td({"data-pid": "flight", "class": "refreshed"}, "flying"),
        td({lang: "la"}, "Elige rubrum catapotium"),
      ),
      tr(
        td({"data-uid": "hannes"}, "Hannes"),
        td,
        td({lang: "la"}, "Omnia faeces"),
      ),
      tr(
        td({"data-uid": "jacob"}, "Jacob"),
        td({"data-pid": "laser"}, "laser eyes"),
        td({lang: "la", class: "refreshed"}, "Carpe noctem"),
      ),
    ),
  ),
);
